import { Knex } from "knex";
import { knex } from "../db";

export class HomeService {
  constructor(protected knex: Knex) {}
  async homePageImage(minAge: Date, maxAge: Date) {
    try {
      let image = await this.knex
        .select("id,username, user_icon, date_of_birth")
        .from("users")
        .whereBetween("date_of_birth", [minAge, maxAge])
        .orderBy("RAND()"); //not yet done!
      return image;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }

  async likeUser(id: string) {
    try {
      let like = await this.knex
        .select("like_to")
        .from("liked")
        .where("liked_from", id);
      return like;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}

export let homeService = new HomeService(knex);

// select liked.liked_from, users.username from liked, users
// where liked_from in (select like_to from liked where liked_from = req.session.id)
// AND liked_to = req.session.id and users.id = liked.liked_from
