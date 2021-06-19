
exports.up = function(knex) {
  return knex.schema.createTable("cohort_members", function (table) {
    table.increments().primary();
    table.integer("user_id").references("id").inTable("users");
    table.integer("role_id").references("id").inTable("roles");
    table.integer("cohort_id").references("id").inTable("cohorts");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cohort_members");
};
