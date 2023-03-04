import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("image");

    if (!(await knex.schema.hasTable("image"))) {
        await knex.schema.createTable("image", (tableBuilder) => {
          tableBuilder.increments();
          tableBuilder.integer("user_id").unsigned();
          tableBuilder.foreign("user_id").references("users.id");
          tableBuilder.string("image1");
          tableBuilder.string("image2");
          tableBuilder.string("image3");
          tableBuilder.string("image4");
          tableBuilder.string("image5");
          tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
          tableBuilder.timestamp("updated_at").defaultTo(knex.fn.now());
        });
      }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("image");
}

