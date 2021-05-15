const Koa = require('koa');
const next = require('next');
const KoaRouter = require('koa-router');
const dotenv = require("dotenv");
const path = require('path');
const bodyParser = require('koa-bodyparser');
// const Mongo = require('koa-mongo');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: dev });

const port = parseInt(process.env.PORT, 10) || 3000;

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = new Koa();
    const router = new KoaRouter();

    // We can also add additional properties to context
    server.context.user = 'Ashish'

    // server.keys = [Shopify.Context.API_SECRET_KEY];

    // server.use(
    //   createShopifyAuth({
    //     afterAuth(ctx) {
    //       const {shop, scope} = ctx.state.shopify;
    //       ACTIVE_SHOPIFY_SHOPS[shop] = scope;

    //       ctx.redirect(`/?shop=${shop}`);
    //     },
    //   }),
    // );

    const handleRequest = async (ctx) => {
        console.log(`Inside handleRequest`);
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    };

    // Routes
    router.get('/test', ctx => {
        ctx.body = `Hello, ${ctx.user}`
    });
    router.get('/test/:name', ctx => {
        ctx.body = `Hello, ${ctx.params.name}`
    });

    router.get("(/_next/static/.*)", handleRequest);
    router.get("/_next/webpack-hmr", handleRequest);
    // router.get("(.*)", verifyRequest(), handleRequest);
    router.get("(.*)", handleRequest);

    server.use(router.allowedMethods());
    server.use(router.routes());

    server.listen(port, () => {
        console.log(`server listening to port --> ${port}`)
    });
});