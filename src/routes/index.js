const siteRouter = require("./site");
const authRouter = require("./auth");

function route(app) {
    app.use('/auth', authRouter);
    app.use('/home', siteRouter);
}

module.exports = route;
