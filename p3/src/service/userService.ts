import { Knex } from "knex";
import { knex } from "../db";
import { checkPassword, hashPassword } from "../hash";
import { User } from "../model";

export class UserService {
  constructor(protected knex: Knex) {}
  async getCurrentUser(id: number): Promise<User> {
    const [user] = await this.knex.select("*").from("users").where("id", id);
    return user;
  }
  async login(obj: any): Promise<{ id: number }> {
    try {
      const [usersRows] = await this.knex
        .select("*")
        .from("users")
        .where("email", obj.email);

      if (!usersRows) {
        throw new Error("User does not exist");
      }

      const checked = await checkPassword(obj.password, usersRows.password);

      if (checked) {
        return { id: usersRows.id };
      } else {
        throw new Error("Password not matched");
      }
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
  async enrol(obj: User): Promise<{ id: number }> {
    try {
      obj.password = await hashPassword(obj.password!);
      let [user] = await this.knex("users")
        .insert({
          username: obj.username,
          password: obj.password,
          gender: obj.gender,
          email: obj.email,
          date_of_birth: obj.date_of_birth,
          user_icon: obj.user_icon,
          is_public: true,
          is_admin: false,
        })
        .returning("id");
      return user;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}
export let userService = new UserService(knex);
