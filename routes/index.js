const express = require("express");
const path = require("path");
var pdf = require("pdf-creator-node");
const fs = require("fs");
const router = express.Router();

router.all("/", async (req, res) => {
  res.redirect("/form");
});

router.get("/form", async (req, res) => {
  res.render("index", { title: "WorkPlace" });
});

router.get("/create", async (req, res) => {
  var templateHtml = fs.readFileSync(
    path.join(process.cwd(), "public/template.html"),
    "utf8"
  );

  var milis = new Date();
  milis = milis.getTime();

  var pdfPath = path.join("pdf", `t-${milis}.pdf`);
  console.log(pdfPath);

  var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    // header: {
    //     height: "45mm",
    //     contents: '<div style="text-align: center; text-transform: uppercase">Анкета заявителя</div>'
    // },
    // body: {
    //     h
    // }
    // footer: {
    //     height: "28mm",
    //     contents: {
    //         first: 'Cover page',
    //         2: 'Second page', // Any page number is working. 1-based index
    //         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
    //         last: 'Last Page'
    //     }
    // }
};

var document = {
    html: templateHtml,
    data: {
      users: users,
    },
    path: "./output.pdf",
    type: "",
  };

//   await page.pdf(options);
  pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });

  res.render("index", { title: "Create" });
});
var users = [
    {
      name: "Shyam",
      age: "26",
    },
    {
      name: "Navjot",
      age: "26",
    },
    {
      name: "Vitthal",
      age: "26",
    },
  ];



module.exports = router;
