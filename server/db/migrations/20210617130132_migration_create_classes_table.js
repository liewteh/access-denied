
exports.up = function(knex) {
  return knex.schema.createTable("classes", function (table) {
    table.increments().primary();
    table.integer("cohort_id").references("id").inTable("cohorts");
    table.timestamp("date").defaultTo(knex.fn.now());
    table.boolean("online_class").notNullable().defaultTo(true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("classes");
};
