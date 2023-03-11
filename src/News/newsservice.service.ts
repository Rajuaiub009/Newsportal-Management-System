import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateNews } from "./news.dto";
import { Repository } from "typeorm";
import { NewsEntity } from "./newsentity.entity";

@Injectable()
export class NewsService {
 
    constructor(
        @InjectRepository(NewsEntity)
        private newsRepo: Repository<NewsEntity>,
      ) {}

      getNewsByID(id):any {
        return this.newsRepo.findOneBy({ id });
      }

    
      insertNews(mydto:CreateNews):any {
        const authornews = new NewsEntity()
        authornews.news = mydto.news;
        return this.newsRepo.save(authornews);
      }

      updateNews(news: any):any {
        console.log(news);
        return this.newsRepo.update(news,news);
        }

        updateNewsbyid(mydto:CreateNews,id):any {
          return this.newsRepo.update(id,mydto);
             }

             getNewsByIDName(qry):any {
              return this.newsRepo.findOneBy({ id:qry.id,news:qry.news });
          }

          deleteNewsbyid(id):any {
    
            return this.newsRepo.delete(id);
        }
          
    }