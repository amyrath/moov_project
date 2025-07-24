"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const mySqlSession = require("express-mysql-session");
const localsData_1 = require("./middlewares/localsData");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setViewEngine("ejs");
    app.setBaseViewsDir((0, path_1.join)(__dirname, "..", "views"));
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "public"));
    const options = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'papa',
        database: 'blog'
    };
    const MySQLStore = mySqlSession(session);
    const store = new MySQLStore(options);
    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    }));
    app.use(localsData_1.localData);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map