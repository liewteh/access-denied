
exports.up = function(knex) {
  return knex.schema.createTable("regions", function (table) {
    table.increments().primary();
    table.string("name", 255).notNullable();
    table.string("country", 255).notNullable();
    table.string("city", 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("regions");
};
