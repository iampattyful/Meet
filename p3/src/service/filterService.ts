import { Knex } from "knex";
import moment from "moment";
import { knex } from "../db";
import { FilterForm, UserRows } from "../model";

export class FilterService {
  constructor(protected knex: Knex) {}
  async filter(obj: FilterForm, userId: number): Promise<UserRows[]> {
    try {
      // calculate age from date of birth
      // Method 1: new Date()
      //   const endDate = new Date();
      //   endDate.setFullYear(new Date().getFullYear() - obj.minAge);
      // Method 2: moment.js
      const min_year = moment()
        .subtract(obj.maxAge, "years")
        .format("YYYY-MM-DD");
      const max_year = moment()
        .subtract(obj.minAge, "years")
        .format("YYYY-MM-DD");
        
      const usersRows = await this.knex
        .select(
          "users.id",
          "users.username",
          "users.user_icon",
          "users.date_of_birth",
          "users.gender",
          "users.about_me",
          "personal_information.education_level",
          "personal_information.job",
          "personal_information.nationality",
          "personal_information.height",
          "personal_information.weight",
          "personal_information.pet",
          "personal_information.fitness",
          "personal_information.smoke",
          "personal_information.drink",
          "image.image1",
          "image.image2",
          "image.image3",
          "image.image4",
          "image.image5"
        ) // add location later?
        .from("users")
        .join("personal_information","users.id","=","personal_information.user_id")
        .join("image","users.id","=","image.user_id")
        .whereNotIn("users.id", function () {
          this.select("liked_to").from("liked").where("liked_from", userId);
        })
        .whereIn("gender", obj.gender)
        .whereBetween("date_of_birth",[min_year,max_year])
        // .andWhere("date_of_birth", ">=", min_year)
        // .andWhere("date_of_birth", "<=", max_year)
        .whereNot("users.id", userId)
        .orderByRaw("random()")
        .limit(20); // limit more users when there are more users in the database
      if (usersRows.length == 0) {
        throw new Error("找不到附合您的篩選條件的用戶,請修改條件後重試!");
      }
      return usersRows;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}
export let filterService = new FilterService(knex);
