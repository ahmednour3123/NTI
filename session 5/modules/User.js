import handleJson from "./fileHandle.js";

export default class Users {
  #users;
  #filename;
  constructor() {
    this.#filename = "users.json";
    this.#users = handleJson.readFromJson(this.#filename);
  }

  save(name, balance) {
    this.#users.push({ id: Date.now(), name, balance });
    handleJson.writeToJson(this.#filename, this.#users);
  }

  editBalance(id, newBalance) {
    const index = this.#users.findIndex((u) => u.id == id);
    this.#users[index].balance = newBalance;
    handleJson.writeToJson(this.#filename, this.#users);
  }

  deleteUser(id) {
    const index = this.#users.findIndex((u) => u.id == id);
    this.#users.splice(index, 1);
    handleJson.writeToJson(this.#filename, this.#users);
  }

  showAll() {
    this.#users.forEach((user) => {
      console.log(
        `id: ${user.id}\tname: ${user.name}\tbalance: ${user.balance}\n`
      );
    });
  }
}
