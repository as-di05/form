const express = require("express");
const path = require("path");
var pdf = require("pdf-creator-node");
const fs = require("fs");
const nodemailer = require("nodemailer");
const { mailConfig } = require("../service/config");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.all("/", async (req, res) => {
  res.redirect("/form");
});

router.get("/form", async (req, res) => {
  res.render("index", { title: "WorkPlace" });
});

router.post("/form", async (req, res) => {
  if (req.body) {
    let {
      fio,
      phone,
      place_work,
      price,
      position_work,
      mid_price,
      address,
      whatsapp,
      instagram,
      facebook,
    } = req.body;

    let templateHtml = fs.readFileSync(
      path.join(process.cwd(), "public/template.html"),
      "utf8"
    );
    let fileName = fio.split(" ")[0];
    let milis = new Date();
    milis = milis.getTime();
    const pdfPath = path.join("pdf", `${fileName}-${milis}.pdf`);

    let options = {
      format: "A4",
      orientation: "portrait",
    };

    let document = {
      html: templateHtml,
      data: {
        request: [
          {
            fio: fio,
            phone: phone,
            place_work: place_work,
            price: price,
            position_work: position_work,
            mid_price: mid_price,
            address: address,
            whatsapp: whatsapp,
            instagram: instagram,
            facebook: facebook,
          },
        ],
      },
      path: `./${pdfPath}`,
      type: "",
    };

    await pdf
      .create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    const filename = `${fileName}-${milis}.pdf`;
    const filePath = `./${pdfPath}`;
    await sendNewFile(filename, filePath);
  }
  res.render("index", { title: "Успешно" });
});

async function sendNewFile(filename, filePath) {
  let transporter = nodemailer.createTransport(mailConfig);
  const email = process.env.EMAIL_RESEPIENT;
  console.log(filename);
  console.log(filePath);
  let info = await transporter.sendMail({
    from: `"Техническая поддержка " <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Файл", // Subject line
    // text: `You forgot your password. No worries, we got you covered.`,
    html: `<b>Для восстановления пароля воспользуйтесь ссылкой ниже:</b>     `, // html body
    attachments: [
      {
        // file on disk as an attachment
        filename: filename,
        path: filePath, // stream this file
      },
    ],
  });

  const isSent = info.accepted[0] === email;
  console.log("Sent: %s", isSent);
}

module.exports = router;