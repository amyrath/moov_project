import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as mySqlSession from 'express-mysql-session'
import { localData } from "./middlewares/localsData"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setViewEngine("ejs");
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.useStaticAssets(join(__dirname, "..", "public"));

  const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'papa',
	database: 'blog'
};
  const MySQLStore =  mySqlSession(session);
  const store = new MySQLStore(options);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: store,
    }),
  );

  app.use(localData)
  await app.listen(3000);
}
bootstrap();
