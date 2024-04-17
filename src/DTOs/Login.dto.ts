import { ApiProperty } from "@nestjs/swagger"


export default class LoginDTO {
    email: string
    pass: string
}