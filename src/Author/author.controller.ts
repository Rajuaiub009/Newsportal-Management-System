  import {Body,Controller,Get,Post,Put,Delete,Param,ParseIntPipe,UsePipes,Query,ValidationPipe,UseInterceptors,FileTypeValidator,MaxFileSizeValidator,UploadedFile,ParseFilePipe,Session,UseGuards} from '@nestjs/common';
  import { CreateAuthor } from './author.dto';
  import { AuthorService } from './authorsevice.service';
  import { NewsService } from '../News/newsservice.service';
  import { CreateEditor } from 'src/Editor/editor.dto';
  import { EditorService } from 'src/Editor/editorservice.service';
  import { diskStorage } from 'multer';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UnauthorizedException } from '@nestjs/common/exceptions';
  import { SessionGuard } from './session.guard';
  import { CreateNews } from '../News/news.dto';
import { Subject } from 'rxjs';


  @Controller('/author')
  export class AuthorController {
    constructor(private authorService: AuthorService,
      private newsService: NewsService,
      private editorService: EditorService 
    )
    {}
  
    @Get('/index')
    getAuthor(): any {
      return this.authorService.getIndex();
    }
    
    @Get('/findauthor')
    getAuthorByIDName(@Query() qry: any): any {
      return this.authorService.getUserByIDName(qry);
    }
  
    @Post('/insertauthor')
  @UsePipes(new ValidationPipe())
    insertAuthor(@Body() mydto: CreateAuthor): any {
      return this.authorService.insertUser(mydto);
    }
  
    @Put('/updateauthor/')
    @UsePipes(new ValidationPipe())
    updateAuthor(@Body('name') name: string, @Body('id') id: number): any {
      return this.authorService.updateUser(name, id);
    }

  @Delete('/deleteauthor/:id')
  deleteAuthorbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.authorService.deleteUserbyid(id);
   
  }

@Post('/signup')
@UseInterceptors(FileInterceptor('filename',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:CreateAuthor,@UploadedFile(new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  

return this.authorService.signup(mydto);
console.log(file)

}

@Get('/signin')
async signin(@Session() session, @Body() mydto:CreateAuthor)
{
if(this.authorService.signin(mydto))
{
  session.email = mydto.email;

  console.log(session.email);
  return {message:"success"};

}
else
{
  return {message:"invalid credentials"};
}
 
}
@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
} 
@Get('/findnews')
getNewsByIDName(@Query() qry: any): any {
  return this.newsService.getNewsByIDName(qry);
}

@Get('/findnews/:id')
  getNewsByID(@Param('id', ParseIntPipe) id: number): any {
    return this.newsService.getNewsByID(id);
  }

  @Post('/insertnews')
  @UsePipes(new ValidationPipe())
    insertNews(@Body() mydto: CreateNews): any {
      return this.newsService.insertNews(mydto);
    }

    @Put('/updatenews/')
    @UsePipes(new ValidationPipe())
    updateNews(@Body('news') news: string): any {
      return this.newsService.updateNews(news);
    }

    @Put('/updatenews/:id')
    @UsePipes(new ValidationPipe())
    updateNewsbyid(
      @Body() mydto: CreateNews,
      @Param('id', ParseIntPipe) id: number,
    ): any {
      return this.newsService.updateNewsbyid(mydto, id);
    }

    @Delete('/deletenews/:id')
  deleteNewsbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.newsService.deleteNewsbyid(id);
  }

  @Post('/inserteditor')
  @UsePipes(new ValidationPipe())
    insertManager(@Body() editordto: CreateEditor): any {
      return this.editorService.insertEditor(editordto);
    }

    @Get('/findeditor/:id')
    getEditorByID(@Param('id', ParseIntPipe) id: number): any {
      return this.editorService.getEditorByID(id);
    }

   @Get('/findeditor')
   getEditorByIDName(@Query() qry: any): any {
   return this.editorService.getEditorByIDName(qry);
}

  @Post('/sendemail')
async sendEmail(@Body('to') to: string,
@Body('subject') subject: string,
@Body('text') text: string)
{
await this.authorService.sendEmail(to,subject,text);
}

}

  