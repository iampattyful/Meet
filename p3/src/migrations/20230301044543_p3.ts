import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("chatroom");

    if (!(await knex.schema.hasTable("group"))) {
        await knex.schema.createTable("group", (tableBuilder) => {
          tableBuilder.increments();
          tableBuilder.integer("matched_user_id1").notNullable();
          tableBuilder.integer("matched_user_id2").notNullable();
          tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
          tableBuilder.timestamp("updated_at").defaultTo(knex.fn.now());
        });
      }

    if (!(await knex.schema.hasTable("message"))) {
        await knex.schema.createTable("message", (tableBuilder) => {
          tableBuilder.increments();
          tableBuilder.integer("user_id").unsigned();
          tableBuilder.foreign("user_id").references("users.id");
          tableBuilder.integer("group_id").unsigned();
          tableBuilder.foreign("group_id").references("group.id");
          tableBuilder.text("message");
          tableBuilder.string("media");
          tableBuilder.enu("media_type", ["image", "video", "audio"]);
          tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
          tableBuilder.timestamp("updated_at").defaultTo(knex.fn.now());
        });
      }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("message");
    await knex.schema.dropTableIfExists("group");
}

