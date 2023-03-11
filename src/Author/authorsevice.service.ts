import { Injectable } from '@nestjs/common';
import { CreateAuthor } from "./author.dto";
import { AuthorEntity } from './authorentity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
 import * as bcrypt from 'bcrypt';
 import { MailerService } from "@nestjs-modules/mailer/dist";
@Injectable()
export class AuthorService {
  // getNewsByIDName(qry: any): any {
  //   throw new Error('Method not implemented.');
  // }
  getUserByIDName(qry: any): any {
    throw new Error('Method not implemented.');
  }
    constructor(
        @InjectRepository(AuthorEntity)
        private authorRepo: Repository<AuthorEntity>,
        private mailerService: MailerService
      ) {}

getIndex():any { 
    return this.authorRepo.find();

}
getUserByID(id: any):any {
    return this.authorRepo.findOneBy({ id });
}

insertUser(mydto:CreateAuthor):any {
    const authoraccount = new AuthorEntity()
    authoraccount.name = mydto.name;
    authoraccount.email = mydto.email;
    authoraccount.password = mydto.password;
    authoraccount.contact = mydto.contact;
   return this.authorRepo.save(authoraccount);
      } 

      
      
      updateUser(name: any,id: string | number):any {
        console.log(name+id);
        return this.authorRepo.update(id,{name:name});
        }

        deleteUserbyid(id):any {
    
          return this.authorRepo.delete(id);
      }
    
        async signup(mydto) {
          const salt = await bcrypt.genSalt();
          const hassedpassed = await bcrypt.hash(mydto.password, salt);
          mydto.password= hassedpassed;
          return this.authorRepo.save(mydto);
          }

          async signin(mydto){
            console.log(mydto.password);
        const getdata= await this.authorRepo.findOneBy({email: mydto.email});
        const isMatch= await bcrypt.compare(mydto.password, getdata.password);
        if(isMatch) {
        return 1;
        }
        else {
            return 0;
        }
        
      }

      async sendEmail(mydata){
        return   await this.mailerService.sendMail({
               to: mydata.email,
               subject: mydata.subject,
               text: mydata.text, 
             });
       
       }
    }
          