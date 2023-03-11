import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './Author/authormodule.module';
import { NewsModule } from './News/newsmodule.module';



@Module({
  imports: [AuthorModule,NewsModule,TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: '12',
     database: 'Newsportal',
     autoLoadEntities: true,
     synchronize: true,
   }
   ),],
  controllers: [],
  providers: [],
})
export class AppModule {}
