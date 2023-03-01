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

      let [userUpload] = await this.knex("users")
        // .join(
        //   "personal_information",
        //   "personal_information.user_id",
        //   "=",
        //   "users.id"
        // )
        // .join("tag", "tag.user_id", "=", "users.id")
        .where("id", userId)
        .update({
          username: obj.username,
          about_me: obj.about_me,
          password: obj.password,
          //////user icon maybe s3///////
          user_icon: obj.user_icon,
          ///////////////////////////
          location: obj.location,

          //personal_information
          // education_level: obj.education_level,
          // job: obj.job,
          // nationality: obj.nationality,
          // height: obj.height,
          // weight: obj.weight,
          // pet: obj.pet,
          // fitness: obj.fitness,
          // smoke: obj.smoke,
          // drink: obj.drink,
          // //tag
          // tag: obj.tag
        })
        .returning("*");

      // let [userPersonalInformationUpload] = await this.knex("personal_information")
      // .where("id", userId)
      // .update({
      //   //personal_information
      //   education_level: obj.education_level,
      //   job: obj.job,
      //   nationality: obj.nationality,
      //   height: obj.height,
      //   weight: obj.weight,
      //   pet: obj.pet,
      //   fitness: obj.fitness,
      //   smoke: obj.smoke,
      //   drink: obj.drink,
      //   // //tag
      //   // tag: obj.tag
      // })
      // .returning("*");

      // let [userTagUpload] = await this.knex("tag")
      // .where("id", userId)
      // .update({
      //   // //tag
      //   tag: obj.tag
      // })
      // .returning("*");

      return userUpload;
      // return userPersonalInformationUpload;
      // return userTagUpload;
    } catch (err) {
      throw new Error(`${err.message}`);
    }

    // try {
    //   let [userPersonalInformationUpload] = await this.knex(
    //     "personal_information"
    //   )
    //     .where("user_id", userId)
    //     .update({
    //       //personal_information
    //       // user_id: userId,
    //       education_level: obj.education_level,
    //       job: obj.job,
    //       nationality: obj.nationality,
    //       height: obj.height,
    //       weight: obj.weight,
    //       pet: obj.pet,
    //       fitness: obj.fitness,
    //       smoke: obj.smoke,
    //       drink: obj.drink,
    //       // //tag
    //       // tag: obj.tag
    //     })
    //     .returning("*");

    //   return userPersonalInformationUpload;
    // } catch (err) {
    //   throw new Error(`${err.message}`);
    // }
  }
  ////////////////////////////////////////////////////////////////
  async loadProfileOfUser(
    obj: EditProfile,
    userId: number
  ): Promise<EditProfile> {
    try {
      if (obj.password !== undefined) {
        obj.password = await hashPassword(obj.password);
      }

      let [userUpload] = await this.knex("users")
        .join(
          "personal_information",
          "personal_information.user_id",
          "=",
          "users.id"
        )
        .join("tag", "tag.user_id", "=", "users.id")
        .where({ id: userId })
        .update({
          username: obj.username,
          about_me: obj.about_me,

          //////user icon maybe s3///////
          user_icon: obj.user_icon,
          ///////////////////////////
          location: obj.location,

          //personal_information
          education_level: obj.education_level,
          job: obj.job,
          nationality: obj.nationality,
          height: obj.height,
          weight: obj.weight,
          pet: obj.pet,
          fitness: obj.fitness,
          smoke: obj.smoke,
          drink: obj.drink,
          //tag
          tag: obj.tag,
        })
        .returning("*");
      return userUpload;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
}

export let editProfileService = new EditProfileService(knex);
