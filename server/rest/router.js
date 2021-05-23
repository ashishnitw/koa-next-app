// This file is where you will create router for your application. Backend router are required within your app as the Admin API won’t accept client-side requests.

const Router = require('@koa/router');
const axios = require('axios');

const router = new Router();

// Test Route
// router.get('/test/:name', ctx => {
//     ctx.body = `Hello, ${ctx.params.name}`
// });

router.get('/test', ctx => {
    ctx.body = `Hello, Test`
});

router.get('/test1', ctx => {
    ctx.body = `Hello, Test 1`
});

router.get('/test2', ctx => {
    ctx.body = `Hello, Test 2`
});

module.exports = router;