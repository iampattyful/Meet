import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("users"))) {
    await knex.schema.createTable("users", (tableBuilder) => {
      tableBuilder.increments();
      tableBuilder.string("username").notNullable();
      tableBuilder.string("password").notNullable();
      tableBuilder.string("email").notNullable().unique();
      tableBuilder.string("user_icon").notNullable();
      tableBuilder.date("date_of_birth").notNullable();
      tableBuilder.enu("gender", ["male", "female", "unisex"]).notNullable();
      tableBuilder.string("location");
      tableBuilder.boolean("is_public").notNullable();
      tableBuilder.boolean("is_admin").notNullable();
      tableBuilder.text("about_me");
      tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
      tableBuilder.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }

  if (!(await knex.schema.hasTable("personal_information"))) {
    await knex.schema.createTable("personal_information", (tableBuilder) => {
      tableBuilder.increments();
      tableBuilder.integer("user_id").unsigned();
      tableBuilder.foreign("user_id").references("users.id");
      tableBuilder.enum("education_level", [
        "high_school",
        "diploma",
        "bachelor",
        "master",
        "phd",
        "others",
      ]);
      tableBuilder.string("job");
      tableBuilder.string("nationality");
      tableBuilder.float("height");
      tableBuilder.float("weight");
      tableBuilder.boolean("pet");
      tableBuilder.boolean("fitness");
      tableBuilder.boolean("smoke");
      tableBuilder.boolean("drink");
      tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
      tableBuilder.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }

  if (!(await knex.schema.hasTable("image"))) {
    await knex.schema.createTable("image", (tableBuilder) => {
      tableBuilder.increments();
      tableBuilder.integer("user_id").unsigned();
      tableBuilder.foreign("user_id").references("users.id");
      tableBuilder.string("image");
      tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
      tableBuilder.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }

  if (!(await knex.schema.hasTable("tag"))) {
    await knex.schema.createTable("tag", (tableBuilder) => {
      tableBuilder.increments();
      tableBuilder.integer("user_id").unsigned();
      tableBuilder.foreign("user_id").references("users.id");
      tableBuilder.string("tag_name");
      tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
      tableBuilder.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }

  if (!(await knex.schema.hasTable("liked"))) {
    await knex.schema.createTable("liked", (tableBuilder) => {
      tableBuilder.increments();
      tableBuilder.integer("liked_from").notNullable();
      tableBuilder.integer("liked_to").notNullable();
      tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
      tableBuilder.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }

  if (!(await knex.schema.hasTable("ref_liked_users"))) {
    await knex.schema.createTable("ref_liked_users", (tableBuilder) => {
      tableBuilder.increments();
      tableBuilder.integer("user_id").unsigned();
      tableBuilder.foreign("user_id").references("users.id");
      tableBuilder.integer("liked_id").unsigned();
      tableBuilder.foreign("liked_id").references("liked.id");
    });
  }

  if (!(await knex.schema.hasTable("chatroom"))) {
    await knex.schema.createTable("chatroom", (tableBuilder) => {
      tableBuilder.increments();
      tableBuilder.integer("user_id").unsigned();
      tableBuilder.foreign("user_id").references("users.id");
      tableBuilder.text("message");
      tableBuilder.string("media");
      tableBuilder.enu("media_type", ["image", "video", "audio"]);
      tableBuilder.timestamp("created_at").defaultTo(knex.fn.now());
      tableBuilder.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("chatroom");
  await knex.schema.dropTableIfExists("ref_liked_users");
  await knex.schema.dropTableIfExists("liked");
  await knex.schema.dropTableIfExists("tag");
  await knex.schema.dropTableIfExists("image");
  await knex.schema.dropTableIfExists("personal_information");
  await knex.schema.dropTableIfExists("user");
}
