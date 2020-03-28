const { Router } = require("express");
const router = Router();
const { File } = require("../helpers/image-remove");
const { createWorker } = require("tesseract.js");

router.get("/", (req, res) => {
  res.render("index", {
    text: ""
  });
});
router.get("/upload", (req, res) => {
  res.redirect('/');
});

router.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("(up) Photo not uploaded");
    return res.redirect("/");
  }
  let sampleFile = req.files.image;
  let imgName = req.files.image.name.trim();
  let newName = `${Date.now()}-${imgName}`;
  let path = `public/upload/${newName}`;

  sampleFile.mv(path, function(err) {
    if (err) {
      console.log("-------", err);
      return res.redirect(`/`);
    } //
    else {
      const worker = createWorker({
        logger: m =>  ''//console.log(m)
      });

      (async () => {
        await worker.load();
        await worker.loadLanguage("eng+ru");
        await worker.initialize("eng+ru");
        const {
          data: { text }
        } = await worker.recognize(
          path
        );
        console.log(text);
        // File.remove(path);
        res.render(`index`, {
          text: text
        });
        await worker.terminate();
      })();

     
    }
  });
});

module.exports = router;
