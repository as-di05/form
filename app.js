const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const path = require("path");
var http = require("http");
var port = process.env.PORT || "3000"

var handlebars = require("express-handlebars").create({
    layoutsDir: path.join(__dirname, "views"),
    defaultLayout: "layout",
    extname: "hbs",
  });

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use('/', indexRouter)


app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started ${port}`)
});