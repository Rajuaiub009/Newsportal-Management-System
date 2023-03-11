import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsEntity } from "./newsentity.entity"

@Module({
imports: [TypeOrmModule.forFeature([NewsEntity])],
controllers: [],
providers: [],

})

export class NewsModule{}