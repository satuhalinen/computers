const fs = require("fs");

class DataStorageLayer {
  constructor() {
    this.data = JSON.parse(
      fs.readFileSync("./computerRegister/Halinen_Satu_computers.json", "utf8")
    );
  }
  getAll() {
    return this.data;
  }
  get(id) {
    return this.data.find((item) => item.id === id);
  }
  insert(item) {
    this.data.push(item);
  }
}

module.exports = { DataStorageLayer };
