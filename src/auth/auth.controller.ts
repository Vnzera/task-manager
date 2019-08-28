import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    // ValidationPope uses DTO to validate data in the body of the request
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto);
    }
}
