import { IsNotEmpty, IsString } from "class-validator";

export class CreateNews {
    
    @IsNotEmpty({ message: "this field Can not be Empty"})
    @IsString()
    news: string;
}