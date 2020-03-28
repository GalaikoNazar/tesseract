const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    limits: { filesize: 50 * 1024 * 1024 }
  })
);
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
//routs
const main = require("./routs/main");
app.use(main);

app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log("Server working");
});
