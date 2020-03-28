const fs = require("fs");
var bg = require("gulp-util");
class File {
  static remove(path) {
    return fs.unlink(path, err => {
      if (err) {
        console.log(err);
        console.log(bg.colors.red("Image not removed!"));
        return "image not removed";
      } else {
        console.log(bg.colors.green("Image removed!"));
        return "image removed";
      }
    });
  }
}
module.exports.File = File;
