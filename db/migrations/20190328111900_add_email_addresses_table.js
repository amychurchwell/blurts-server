"use strict";

exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable("email_addresses", table => {
            table.increments("id").primary();
            table.integer("subscriber_id").references("subscribers.id").notNullable();
            table.string("sha1");
            table.string("email");
            table.string("verification_token").unique();
            table.boolean("verified").defaultTo(false);
        }),

        knex.schema.alterTable("subscribers", table => {
            table.renameColumn("sha1", "primary_sha1");
            table.renameColumn("email", "primary_email");
            table.renameColumn("verification_token", "primary_verification_token");
            table.renameColumn("verified", "primary_verified");
        }),
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTableIfExists("email_addresses"),

        knex.schema.alterTable("subscribers", table => {
            table.renameColumn("primary_sha1", "sha1");
            table.renameColumn("primary_email", "email");
            table.renameColumn("primary_verification_token", "verification_token");
            table.renameColumn("primary_verified", "verified");
        }),
    ]);
};
