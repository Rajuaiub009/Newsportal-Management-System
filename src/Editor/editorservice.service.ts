import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEditor } from "./editor.dto";
import { EditorEntity } from "./editorentity.entity";


@Injectable()
export class EditorService {
    constructor(
        @InjectRepository(EditorEntity)
        private editorRepo: Repository<EditorEntity>,
      ) {}


      insertEditor(mydto:CreateEditor):any {
        const editoracc = new EditorEntity()
        editoracc.name = mydto.name;
        editoracc.email = mydto.email;
        editoracc.password = mydto.password;
        editoracc.contact = mydto.contact;
        return this.editorRepo.save(editoracc);
      }

      getEditorByID(id):any {
        return this.editorRepo.findOneBy({ id });
      }

      getEditorByIDName(qry):any {
        return this.editorRepo.findOneBy({ id:qry.id,name:qry.name });
    }

}