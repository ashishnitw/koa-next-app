const Koa = require('koa');
const Router = require('@koa/router');
const next = require('next');
const dotenv = require("dotenv");

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: dev });

const port = parseInt(process.env.PORT, 10) || 3000;

const handle = app.getRequestHandler();

const server = new Koa();
const router = require('./server/rest/router')

server.use(router.routes()).use(router.allowedMethods());

app.prepare().then(() => {

    const handleRequest = async (ctx) => {
        console.log(`Inside handleRequest`);
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    };

    router.get("(/_next/static/.*)", handleRequest);
    router.get("/_next/webpack-hmr", handleRequest);
    // router.get("(.*)", verifyRequest(), handleRequest);
    router.get("(.*)", handleRequest);

    server.listen(port, () => {
        console.log(`server listening to port --> ${port}`)
    });
});