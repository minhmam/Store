const siteRouter = require('./site');
const storeRouter = require('./store');
const accountRouter = require('./account');
const authRoute = require('./auth');
const userRoute = require('./user');

function route(app) {
    app.use('/v1/user', userRoute);
    app.use('/v1/auth', authRoute);
    app.use('/store', storeRouter);
    app.use('/account', accountRouter)
    app.use('/', siteRouter);
}

module.exports = route;