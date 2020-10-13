
/**
 *
 *@file login api
 *
 */
const env = require('../../config/env.json');
const config = require(`../../config/config.${env.env}.json`);
const db = config.mongo.db;
const user = config.collections.user;
const responseFilter = require('../../utils/responseFilter');

module.exports = {
    login: async function (ctx) {
        try {

        } catch (error) {
            console.log(error);
            ctx.body = responseFilter(500, false, error.message);
        }
    }
}
