import { Knex } from "knex";
import { knex } from "../db";
import { hashPassword } from "../hash";
import { EditProfile } from "../model";

export class EditProfileService {
  constructor(protected knex: Knex) {}
  async editProfileOfUser(obj: EditProfile, userId: number): Promise<any> {
    try {
      console.log(userId);
      if (obj.password !== undefined) {
        obj.password = await hashPassword(obj.password);
      }

      let arr = [];
      let userUpload = await this.knex("users")
        .where("id", userId)
        .update({
          username: obj.username,
          password: obj.password,
          user_icon: obj.user_icon,
          location: obj.location,
          about_me: obj.about_me,
        })
        .returning("*");
      arr.push(userUpload);

      let userUpload2 = await this.knex("personal_information")
        .where("user_id", userId)
        .update({
          education_level: obj.education_level,
          job: obj.job,
          nationality: obj.nationality,
          height: obj.height,
          weight: obj.weight,
          pet: obj.pet,
          fitness: obj.fitness,
          smoke: obj.smoke,
          drink: obj.drink,
        })
        .returning("*");
      arr.push(userUpload2);

      let userUpload3 = await this.knex("tag")
        .where("user_id", userId)
        .update({ tag_name: obj.tag_name })
        .returning("*");
      arr.push(userUpload3);

      let userUpload4 = await this.knex("image")
        .where("user_id", userId)
        .update({ image: obj.image })
        .returning("*");
      arr.push(userUpload4);

      console.log(arr);

      return arr;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }

  ////////////////////////////////////////////////////////////////
  async loadProfileOfUser(
    obj: EditProfile,
    userId: number
  ): Promise<EditProfile[]> {
    try {
      let rows = await this.knex("users")
        .join(
          "personal_information",
          "personal_information.user_id",
          "=",
          "users.id"
        )
        .join("tag", "tag.user_id", "=", "users.id")
        .join("image", "image.user_id", "=", "users.id")
        .select(
          "users.username",
          "users.password",
          "users.user_icon",
          "users.location",
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
          "tag.tag_name",
          "image.image"
        )
        .where("users.id", userId);
      console.log(rows);

      return rows;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}

export let editProfileService = new EditProfileService(knex);
