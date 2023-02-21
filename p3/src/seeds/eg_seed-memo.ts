import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("like_memo").del();
    await knex("memo").del();
    await knex("users").del();
    
    

    // Inserts seed entries
    const [jim,alex,leo] = await knex("users").insert([
        { username: "jim", password: "123456"},
        { username: "alex", password: "123456"},
        { username: "leo", password: "123456"}
    ]).returning('id');
    console.log(jim,alex,leo)
    
    const [jim_memo_1,jim_memo_2,alex_memo_1,leo_memo_1] = await knex("memo").insert([
        { content: "memo1_jim",users_id:jim.id,like_count:0},
        { content: "memo2_jim",users_id:jim.id,like_count:0},
        { content: "memo1_alex",users_id:alex.id,like_count:0},
        { content: "memo1_leo",users_id:leo.id,like_count:0}
    ]).returning("id");
    console.log(jim_memo_1,jim_memo_2,alex_memo_1,leo_memo_1)

    await knex("like_memo").insert([
        { users_id: alex.id,memo_id:jim_memo_1.id}
    ])
    await knex("memo").update({like_count:1}).where("id",jim_memo_1.id)
};
