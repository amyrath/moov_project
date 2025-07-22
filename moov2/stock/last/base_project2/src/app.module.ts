import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
//import { AuthModule } from '@search/auth/auth.module';
import { JwtAuthGuard } from '@search/auth/jwt-auth.guard';
import { SearchModule } from '@search/search.module';
import { Csv } from '@search/csv/csv.entity';
import { Tgz } from '@search/tgz/tgz.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'papa',
    database: 'blog',
    entities: [User],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Csv, Tgz]),
   // AuthModule,
    UserModule,
    SearchModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule { }
