import { IsDate, IsString, IsBoolean,  } from "class-validator";

export class CreateTodoDto {
   
   
    @IsString()
    title: string;

    // @IsDate()
    // date: Date;

    // @IsBoolean()
    // completed: boolean;
}
