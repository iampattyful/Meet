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
  let [d1, d2, d3, d4, d5] = await knex("users")
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
        user_icon: "2.jpg",
        date_of_birth: "2001-02-12",
        gender: "female",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "demo3",
        password: hash_password,
        email: "demo3@gmail.com",
        user_icon: "3.jpg",
        date_of_birth: "1962-06-22",
        gender: "male",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "demo4",
        password: hash_password,
        email: "demo4@gmail.com",
        user_icon: "4.jpg",
        date_of_birth: "1991-02-12",
        gender: "female",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "demo5",
        password: hash_password,
        email: "demo5@gmail.com",
        user_icon: "5.jpg",
        date_of_birth: "1942-09-22",
        gender: "unisex",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "demo6",
        password: hash_password,
        email: "demo6@gmail.com",
        user_icon: "6.jpg",
        date_of_birth: "1981-02-12",
        gender: "unisex",
        is_public: "true",
        is_admin: "false",
      },
    ])
    .returning("id");
  console.log(d1);
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

  // user 1 and 2 liked each other,
  // user 1 liked user 3 but user 3 didn't like user 1
  // user 2 liked user 3 but user 3 didn't like user 2
  // user 4 liked user 3 but user 3 didn't like user 4
  await knex("liked").insert([
    {
      liked_from: d1.id,
      liked_to: d2.id,
    },
    {
      liked_from: d1.id,
      liked_to: d3.id,
    },
    {
      liked_from: d1.id,
      liked_to: d4.id,
    },
    {
      liked_from: d1.id,
      liked_to: d5.id,
    },
    {
      liked_from: d2.id,
      liked_to: d1.id,
    },
    {
      liked_from: d2.id,
      liked_to: d3.id,
    },
    {
      liked_from: d3.id,
      liked_to: d1.id,
    },
    {
      liked_from: d4.id,
      liked_to: d3.id,
    },
    {
      liked_from: d4.id,
      liked_to: d1.id,
    },
    {
      liked_from: d5.id,
      liked_to: d1.id,
    },
  ]);

  await knex("chatroom").insert([
    {
      user_id: d1.id,
      message: "hi",
    },
  ]);
  await sleep(1000);

  await knex("chatroom").insert([
    {
      user_id: d2.id,
      message: "hi",
    },
  ]);

  await sleep(1000);

  await knex("chatroom").insert([
    {
      user_id: d2.id,
      message: "nice to meet u",
    },
  ]);

  await sleep(1000);

  await knex("chatroom").insert([
    {
      user_id: d3.id,
      message: "gd night",
    },
  ]);

  await sleep(1000);

  await knex("chatroom").insert([
    {
      user_id: d4.id,
      message: "gd morning",
    },
  ]);
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("a");
    }, ms);
  });
}
