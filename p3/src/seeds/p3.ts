import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();
  let hash_password = await hashPassword("123");
  console.log(hash_password);
  // Inserts seed entries
  await knex("users")
    .insert([
      {
        username: "demo1",
        password: hash_password,
        email: "demo1@gmail.com",
        user_icon: "1.jpg",
        date_of_birth: "2002-06-22",
        gender: "male",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "demo2",
        password: hash_password,
        email: "demo2@gmail.com",
        user_icon: "1.jpg",
        date_of_birth: "2001-02-12",
        gender: "female",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "demo3",
        password: hash_password,
        email: "demo3@gmail.com",
        user_icon: "1.jpg",
        date_of_birth: "1988-04-21",
        gender: "female",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "demo4",
        password: hash_password,
        email: "demo4@gmail.com",
        user_icon: "1.jpg",
        date_of_birth: "1993-07-25",
        gender: "male",
        is_public: "true",
        is_admin: "false",
      },
    ])
    .returning("id");
}
