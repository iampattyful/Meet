import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { username: "demo1", password: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", email: "demo1@gmail.com", user_icon: "1.jpg", date_of_birth: "2022-02-22", gender:"male", is_public:"true", is_admin:"false"},
        { username: "demo2", password: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", email: "demo2@gmail.com", user_icon: "1.jpg", date_of_birth: "2022-02-22", gender:"male", is_public:"true", is_admin:"false"},
        { username: "demo3", password: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", email: "demo3@gmail.com", user_icon: "1.jpg", date_of_birth: "2022-02-22", gender:"male", is_public:"true", is_admin:"false"},
        { username: "demo4", password: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", email: "demo4@gmail.com", user_icon: "1.jpg", date_of_birth: "2022-02-22", gender:"male", is_public:"true", is_admin:"false"}   
    ]);
};
