exports.up = function (knex) {
  return knex.schema.createTable("class_attendances", function (table) {
    table.primary(["class_id", "user_id"], "id");
    table.integer("class_id").references("id").inTable("classes");
    table.integer("user_id").references("id").inTable("users");
    table.boolean("attended").notNullable().defaultTo(true);
    table.boolean("arrived_late").notNullable().defaultTo(false);
    table.integer("late_minutes").notNullable().defaultTo(0);
    table.boolean("camera_on").notNullable().defaultTo(true);
    table.boolean("connectivity_issues").notNullable().defaultTo(false);
    table.boolean("distracted").notNullable().defaultTo(false);
    table.string("comments", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("class_attendances");
};
