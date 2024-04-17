import { ApiBody } from "@nestjs/swagger";


export default class UserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
}