import { Knex } from "knex";
import { knex } from "../db";
import { checkPassword } from "../hash";
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
        throw new Error("用戶不存在!");
      }

      const checked = await checkPassword(obj.password, usersRows.password);

      if (checked) {
        return { id: usersRows.id };
      } else {
        throw new Error("密碼錯誤!");
      }
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
  async enroll(obj: User): Promise<{ id: number }> {
    try {
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

      await this.knex("personal_information")
        .insert({
          user_id: user.id,
          education_level:"others",
          job:" ",
          nationality:" ",
          height:0,
          weight:0,
          pet:false,
          fitness:false,
          smoke:false,
          drink:false
        })
      await this.knex("image").insert({
        user_id: user.id,
        image1: "profile_image_placeholder.jpg",
        image2: "profile_image_placeholder.jpg",
        image3: "profile_image_placeholder.jpg",
        image4: "profile_image_placeholder.jpg",
        image5: "profile_image_placeholder.jpg",
      });
      return user.id;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}
export let userService = new UserService(knex);
