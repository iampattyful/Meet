import { Knex } from "knex";

import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries

  // await knex("ref_liked_users").del();

  await knex("image").del();
  await knex("message").del();
  await knex("group").del();
  await knex("liked").del();
  await knex("tag").del();
  await knex("personal_information").del();
  await knex("users").del();

  let hash_password = await hashPassword("123");
  console.log(hash_password);
  // Inserts seed entries
  let [
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
    d7,
    d8,
    d9,
    d10,
    d11,
    d12,
    d13,
    d14,
    d15,
    d16,
    d17,
    d18,
    d19,
    d20,
  ] = await knex("users")
    .insert([
      {
        username: "Ben",
        password: hash_password,
        email: "demo1@gmail.com",
        user_icon: "male1.jpg",
        date_of_birth: "2002-06-22",
        gender: "male",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Rosa",
        password: hash_password,
        email: "demo2@gmail.com",
        user_icon: "test.jpg",
        date_of_birth: "1989-02-12",
        gender: "female",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Kim Jimin",
        password: hash_password,
        email: "demo3@gmail.com",
        user_icon: "male2.jpg",
        date_of_birth: "1991-06-22",
        gender: "male",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Mandy Chan",
        password: hash_password,
        email: "demo4@gmail.com",
        user_icon: "photo-1616325629936-99a9013c29c6.jpeg",
        date_of_birth: "1979-02-12",
        gender: "female",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "David Park",
        password: hash_password,
        email: "demo5@gmail.com",
        user_icon: "asian-hairstyles-men-faux-hawk-side-part.jpg",
        date_of_birth: "1942-09-22",
        gender: "unisex",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Aom Sushar",
        password: hash_password,
        email: "demo6@gmail.com",
        user_icon: "photo-1515734674582-29010bb37906.jpeg",
        date_of_birth: "1981-02-12",
        gender: "unisex",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Lee Minho",
        password: hash_password,
        email: "demo7@gmail.com",
        user_icon: "c747ded3d24dd033634e7f3ff2dd8364.jpg",
        date_of_birth: "1992-06-22",
        gender: "male",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Irene Bae",
        password: hash_password,
        email: "demo8@gmail.com",
        user_icon: "main-qimg-3d7e2593ff5070af7648cee4d70c43b6-lq.jpeg",
        date_of_birth: "2000-02-12",
        gender: "female",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "John Chan",
        password: hash_password,
        email: "demo9@gmail.com",
        user_icon: "360_F_312907438_yndoDCcP7U0JAY1eOKoRdcYaVfRBQe6E.jpg",
        date_of_birth: "1952-06-22",
        gender: "male",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Fan Bingbing",
        password: hash_password,
        email: "demo10@gmail.com",
        user_icon: "Fan-Bingbing.jpg",
        date_of_birth: "1981-02-12",
        gender: "female",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Wang Baoqiang",
        password: hash_password,
        email: "demo11@gmail.com",
        user_icon:
          "desktop-wallpaper-cute-asian-chinese-girl-ultra-mobile-chinese-female.jpg",
        date_of_birth: "1972-09-22",
        gender: "unisex",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Han Jun Kook",
        password: hash_password,
        email: "demo12@gmail.com",
        user_icon: "780f4275ca42b22a2e8c3540c5464779.jpg",
        date_of_birth: "1999-02-12",
        gender: "unisex",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Nancy Ching",
        password: hash_password,
        email: "demo13@gmail.com",
        user_icon: "1_z9lnv3aP8QVYTNm7LBTXhg.jpeg",
        date_of_birth: "1979-02-12",
        gender: "female",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Suzuki",
        password: hash_password,
        email: "demo14@gmail.com",
        user_icon: "53fa4cab5f4adab5b4bc40c0d.jpeg",
        date_of_birth: "1976-09-22",
        gender: "unisex",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Jojo Yim",
        password: hash_password,
        email: "demo15@gmail.com",
        user_icon: "7SjA9KTJ_400x400.jpg",
        date_of_birth: "1949-02-12",
        gender: "unisex",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Leo Lui",
        password: hash_password,
        email: "demo16@gmail.com",
        user_icon: "b351146c9c416268af719eef9277710a.jpg",
        date_of_birth: "1992-09-22",
        gender: "male",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Adam Aras",
        password: hash_password,
        email: "demo17@gmail.com",
        user_icon: "09da3752a9828aeee4161b3cbc4f8524.jpg",
        date_of_birth: "1985-02-12",
        gender: "unisex",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Coffee Lam",
        password: hash_password,
        email: "demo18@gmail.com",
        user_icon: "main-qimg-92dfb20272ad71a99da0e2256521faf9-lq.jpeg",
        date_of_birth: "1959-02-12",
        gender: "female",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Wong Yat Ming",
        password: hash_password,
        email: "demo19@gmail.com",
        user_icon: "7a302c2dc667d2b9bafb84f8dde99857.jpg",
        date_of_birth: "1974-09-22",
        gender: "unisex",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Pak Ho",
        password: hash_password,
        email: "demo20@gmail.com",
        user_icon: "15c99b9a561cfa1937c30f50af17e191.jpg",
        date_of_birth: "2003-02-12",
        gender: "male",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Arthur Chu",
        password: hash_password,
        email: "demo21@gmail.com",
        user_icon: "arthurchuheadshot8x10.jpg",
        date_of_birth: "1978-06-22",
        gender: "male",
        is_public: "true",
        is_admin: "false",
      },
      {
        username: "Andrew Shek",
        password: hash_password,
        email: "demo22@gmail.com",
        user_icon: "360_F_101604135_ZlYdAfFBdBYt7K9Rlpz0U8EpFPCUBCga.jpg",
        date_of_birth: "1997-06-22",
        gender: "male",
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
    {
      user_id: d2.id,
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
    {
      user_id: d3.id,
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
    {
      user_id: d4.id,
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
    {
      user_id: d5.id,
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
    {
      user_id: d6.id,
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
    {
      user_id: d7.id,
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
    {
      user_id: d8.id,
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
    {
      user_id: d9.id,
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
    {
      user_id: d10.id,
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
    {
      user_id: d11.id,
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
    {
      user_id: d12.id,
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
    {
      user_id: d13.id,
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
    {
      user_id: d14.id,
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
    {
      user_id: d15.id,
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
    {
      user_id: d16.id,
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
    {
      user_id: d17.id,
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
    {
      user_id: d18.id,
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
    {
      user_id: d19.id,
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
    {
      user_id: d20.id,
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
  await knex("tag").insert([
    { user_id: d1.id, tag_name: "run" },
    { user_id: d2.id, tag_name: "swim" },
    { user_id: d2.id, tag_name: "sleep" },
    { user_id: d3.id, tag_name: "basketball" },
    { user_id: d4.id, tag_name: "sleep" },
    { user_id: d5.id, tag_name: "eat" },
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

  let [g1, g2, g3, g4] = await knex("group")
    .insert([
      {
        matched_user_id1: d1.id,
        matched_user_id2: d2.id,
      },
      {
        matched_user_id1: d1.id,
        matched_user_id2: d3.id,
      },
      {
        matched_user_id1: d1.id,
        matched_user_id2: d4.id,
      },
      {
        matched_user_id1: d1.id,
        matched_user_id2: d5.id,
      },
    ])
    .returning("id");

  await knex("message").insert([
    {
      user_id: d1.id,
      group_id: g1.id,
      message: "hi",
    },
  ]);
  await sleep(1000);

  await knex("message").insert([
    {
      user_id: d2.id,
      group_id: g1.id,
      message: "hi",
    },
  ]);

  await sleep(1000);

  await knex("message").insert([
    {
      user_id: d2.id,
      group_id: g1.id,
      message: "nice to meet u",
    },
  ]);

  await sleep(1000);

  await knex("message").insert([
    {
      user_id: d3.id,
      group_id: g2.id,
      message: "gd night",
    },
  ]);

  await sleep(1000);

  await knex("message").insert([
    {
      user_id: d4.id,
      group_id: g3.id,
      message: "gd morning",
    },
  ]);

  await sleep(1000);

  await knex("message").insert([
    {
      user_id: d1.id,
      group_id: g3.id,
      message: "long time no c",
    },
  ]);

  await sleep(1000);

  await knex("message").insert([
    {
      user_id: d5.id,
      group_id: g4.id,
      message: "yo",
    },
  ]);

  await sleep(1000);

  await knex("message").insert([
    {
      user_id: d1.id,
      group_id: g4.id,
      message: "yo yo",
    },
  ]);

  await knex("image").insert([
    {
      user_id: d1.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d2.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d3.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d4.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d5.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d6.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d7.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d8.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d9.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d10.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d11.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d12.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d13.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d14.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d15.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d16.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d17.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d18.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d19.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
    },
    {
      user_id: d20.id,
      image1: "test.jpg",
      image2: "test.jpg",
      image3: "test.jpg",
      image4: "test.jpg",
      image5: "test.jpg",
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
