import { Knex } from "knex";
import moment from "moment";
import { knex } from "../db";
import { FilterForm, UserRows } from "../model";

export class FilterService {
  constructor(protected knex: Knex) {}
  async filter(obj: FilterForm): Promise<UserRows[]> {
    try {
      // calculate age from date of birth
      // Method 1: new Date()
      //   const endDate = new Date();
      //   endDate.setFullYear(new Date().getFullYear() - obj.minAge);
      // Method 2: moment.js
      const today = moment();
      const min_year = today.subtract(obj.minAge, "years").format("YYYY-MM-DD");
      const max_year = today.subtract(obj.maxAge, "years").format("YYYY-MM-DD");
      const usersRows = await this.knex
        .select("username", "user_icon", "date_of_birth", "gender") // add location later?
        .from("users")
        .where("gender", obj.gender)
        .andWhere("date_of_birth", ">=", min_year)
        .andWhere("date_of_birth", "<=", max_year);
      if (usersRows.length == 0) {
        throw new Error("No users found");
      }
      return usersRows;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}
export let filterService = new FilterService(knex);
