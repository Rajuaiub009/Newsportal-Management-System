import { IsNotEmpty, IsString, Length, IsEmail, Matches } from "class-validator";

export class CreateAuthor {
    
    @IsNotEmpty({ message: "Enter your name here!"})
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "please provide a password"})
    @Length(8.16)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message: "Too weak"})

    password: string;

    @IsNotEmpty({ message: "Please enter your contact information"})
    @IsString()
    contact: string;
    
     filename: string;

}