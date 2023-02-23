import { Knex } from "knex";
import { knex } from "../db";

export class FilterService {
  constructor(protected knex: Knex) {}
  async filter(obj: any) {
    try {
      const usersRows = await this.knex
        .select("*")
        .from("users")
        .where("email", obj.email);
      if (usersRows.length == 0) {
        return { success: false, err: "User doesn't exist" };
      }
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}
export let userService = new FilterService(knex);
