import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EditorEntity } from './editorentity.entity';


@Module({
imports: [TypeOrmModule.forFeature([EditorEntity])],
controllers: [],
providers: [],

})

export class NewsModule{}