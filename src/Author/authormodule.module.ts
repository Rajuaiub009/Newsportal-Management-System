import { Module } from '@nestjs/common';
import { AuthorController } from "./author.controller"
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorService } from "./authorsevice.service"
import { AuthorEntity } from "./authorentity.entity"
import { NewsService } from 'src/News/newsservice.service';
import { NewsEntity } from "src/News/newsentity.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { EditorService } from 'src/Editor/editorservice.service';
import { EditorEntity } from 'src/Editor/editorentity.entity';

@Module({

imports: [
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                       user: 'npms@gmail.com',
                       pass: 'hivfofbqoagehnwr'
                   },
                  }
      }),

      
      TypeOrmModule.forFeature([AuthorEntity,NewsEntity,EditorEntity])],
controllers: [AuthorController],
providers: [AuthorService,NewsService,EditorService],


})


export class AuthorModule{}