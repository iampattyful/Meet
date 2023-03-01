import { Knex } from "knex";
import { knex } from "../db";
import { hashPassword } from "../hash";
import { EditProfile } from "../model";

export class EditProfileService {
  constructor(protected knex: Knex) {}
  async editProfileOfUser(
    obj: EditProfile,
    userId: number
  ): Promise<EditProfile> {
    try {
      if (obj.password !== undefined) {
        obj.password = await hashPassword(obj.password);
      }

      let [userUpload] = await this.knex("user")
        .join(
          "personal_information",
          "personal_information.user_id",
          "=",
          "users.id"
        )
        .where({ id: userId })
        .update(obj)
        .returning("*");
      return userUpload;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}

export let editProfileService = new EditProfileService(knex);
