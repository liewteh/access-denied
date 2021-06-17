
exports.up = function(knex) {
  return knex.schema.createTable("cohorts", function (table) {
    table.increments().primary();
    table.integer("region_id").references("id").inTable("regions");
    table.integer("cohort_number").notNullable();
    table.timestamp("started_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cohorts");
};
