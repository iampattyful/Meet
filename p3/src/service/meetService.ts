import { Knex } from "knex";
import { knex } from "../db";
import { UserInformation } from "../model";

export class MeetService {
  constructor(protected knex: Knex) {}
  // async homePageImage(minAge: Date, maxAge: Date) {
  //   try {
  //     let image = await this.knex
  //       .select("id,username, user_icon, date_of_birth")
  //       .from("users")
  //       .whereBetween("date_of_birth", [minAge, maxAge])
  //       .orderBy("RAND()"); //not yet done!
  //     return image;
  //   } catch (err) {
  //     throw new Error(`${err.message}`);
  //   }
  // }

  async likeUser(fromUserId: string, toUserId: string) {
    try {
      let [like] = await this.knex("liked")
        .insert({ liked_from: fromUserId, liked_to: toUserId })
        .returning(["liked_from", "liked_to"]);
      return like;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }

  async userInformation(userId: number): Promise<UserInformation> {
    try {
      let [userInformation] = await this.knex
        .select(
          "username",
          "user_icon",
          "date_of_birth",
          "gender",
          "location",
          "education_level",
          "job",
          "nationality",
          "height",
          "weight",
          "pet",
          "fitness",
          "smoke",
          "drink",
          "tag_name"
        )
        .from("users")
        .join("personal_information", {
          "personal_information.user_id": "users.id",
        })
        .where("id", userId)
        .join("tag", { "tag.user_id": "user.id" })
        .where("id", userId);

      return userInformation;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export let meetService = new MeetService(knex);

// select liked.liked_from, users.username from liked, users
// where liked_from in (select like_to from liked where liked_from = req.session.id)
// AND liked_to = req.session.id and users.id = liked.liked_from
