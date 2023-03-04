import { Knex } from "knex";
import { knex } from "../db";
import { UserInformation } from "../model";
export class MeetService {
  constructor(protected knex: Knex) {
    this.knex = knex;
  }
  // async mainPageImage(minAge: Date, maxAge: Date) {
  //   try {
  //     let image = await this.knex
  //       .select("id,username, user_icon, date_of_birth")
  //       .from("users")
  //       .whereBetween("date_of_birth", [minAge, maxAge])
  //       .orderBy("RAND()"); //not yet done!
  //     console.log(image);

  //     return image;
  //   } catch (err) {
  //     throw new Error(`${err.message}`);
  //   }
  // }

  async userInformation(
    // fromUserId: number,
    toUserId: number
  ): Promise<UserInformation> {
    try {
      let userInformation = await this.knex("users")
        // .distinct()
        .join(
          "personal_information",
          "personal_information.user_id",
          "=",
          "users.id"
        )
        .join("tag", "tag.user_id", "=", "users.id")
        // .join("image", "image.user_id", "=", "users.id")
        .select(
          "users.username",
          "users.user_icon",
          "users.date_of_birth",
          "users.gender",
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
          "tag.tag_name"
          // "image.image"
        )
        // .whereNotIn("users.id", function () {
        //   this.select("liked_to").from("liked").where("liked_from", toUserId)
        // });
        .where("users.id", toUserId);
      // .whereNot("users.id", fromUserId)
      // .whereNot("users.id", "in", subquery)
      // .orderByRaw("users.created_at DESC LIMIT 20");
      // ;
      console.log(userInformation);

      return [userInformation] as any;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async likeUser(fromUserId: string, toUserId: string) {
    try {
      let [like] = await this.knex("liked")
        .insert({ liked_from: fromUserId, liked_to: toUserId })
        .returning(["liked_from", "liked_to"]);
      let rows = await this.knex("liked")
        .select("id")
        .where("liked_from", like.liked_to)
        .andWhere("liked_to", like.liked_from);
      if (rows.length > 0) {
        await this.knex("group")
          .insert({
            matched_user_id1: like.liked_from,
            matched_user_id2: like.liked_to,
          })
          .returning("id");
        await this.knex("message").insert({
          user_id: like.liked_from,
          group_id: like.liked_to,
          message: "You got a new friend!!",
        });
      }
      return like;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}

export let meetService = new MeetService(knex);

// select liked.liked_from, users.username from liked, users
// where liked_from in (select like_to from liked where liked_from = req.session.id)
// AND liked_to = req.session.id and users.id = liked.liked_from

// .from("users")
//         .join("personal_information", "users.id", "=", "user_id")
//         .join("tag", "users.id", "=", "user_id")
//         .where("id", userId);
