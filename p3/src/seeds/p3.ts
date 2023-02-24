import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("chatroom").del();
  await knex("ref_liked_users").del();
  await knex("liked").del();
  await knex("tag").del();
  await knex("image").del();
  await knex("personal_information").del();
  await knex("users").del();

  let hash_password = await hashPassword("123");
  console.log(hash_password);
  // Inserts seed entries
  let [d1] = await knex("users")
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
    ])
    .returning("id");
  await knex("personal_information").insert([
    {
      user_id: d1.id,
      education_level: "high_school",
      job: "programmer",
      nationality: "hk",
      height: 175,
      weight: 59,
      pet: false,
      fitness: false,
      smoke: false,
      drink: false,
    },
  ]);
}
