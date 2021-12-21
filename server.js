'use strict';
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
require('dotenv').config();

const routes = require("./routes");

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
    });

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try {
        await server.register({
            plugin: require('hapi-mongodb'),
            options: {
                url: `mongodb+srv://melih:${process.env.MONGODB_PASSWORD}@cluster0.vpjlz.mongodb.net/todo?retryWrites=true&w=majority`,
                settings: {
                    useUnifiedTopology: true
                },
                decorate: true
            }
        })
    } catch (err) {
        console.log(err);
    }

    // Add the route
    server.route(routes);

    try {
        await server.start();
        console.log('Server running on %s', server.info.uri);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
