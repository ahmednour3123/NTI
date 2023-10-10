import fs from "fs";

export default class handleJson {
  static readFromJson(filename = "user.json") {
    let result;
    try {
      result = JSON.parse(fs.readFileSync(filename));
    } catch (e) {
      result = [];
    }

    return result;
  }

  static writeToJson(filename = "user.json", data) {
    fs.writeFileSync(filename, JSON.stringify(data));
  }
}
