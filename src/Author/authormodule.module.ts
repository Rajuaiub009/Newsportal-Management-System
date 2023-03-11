import { Module } from '@nestjs/common';
import { AuthorController } from "./author.controller"
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorService } from "./authorsevice.service"
import { AuthorEntity } from "./authorentity.entity"
import { NewsService } from 'src/News/newsservice.service';
import { NewsEntity } from "src/News/newsentity.entity";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({

imports: [
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                       user: 'your email address',
                       pass: 'your app password'
                   },
                  }
      }),

      
      TypeOrmModule.forFeature([AuthorEntity,NewsEntity])],
controllers: [AuthorController],
providers: [AuthorService,NewsService],



})


export class AuthorModule{}