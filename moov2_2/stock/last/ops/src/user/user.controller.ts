/*import { Body, Controller, Get, Post, Render, Redirect, UseInterceptors, ClassSerializerInterceptor, Session, UseGuards, Request } from '@nestjs/common';
import { SignupDto } from './dtos/SignupDto';
import { LoginDto } from './dtos/LoginDto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get("/signup")
    @Render("user/signup")
    getSignup() { }

    @Get("/login")
    @Render("user/login")
    getlogin() { }

    @Post("/signup")
    @Redirect('/user/login')
    async postSignup(@Body() body: SignupDto) {
        return { message: await this.userService.postSignup(body) };
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post("/login")
    //@Redirect("/")
    async postLogin(@Body() body: LoginDto, @Session() session: Record<string, any>) {
        const user = await this.userService.postLogin(body);
        return user;
        session.user = user;
        session.connected = true;
    }

    @Post("/logout")
    @Redirect("login")
    PostLOgout(@Session() session: Record<string, any>) {
        session.destroy((err) => { });
    }

   /* @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
*/

// src/user/user.controller.ts
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dtos/LoginDto';
import { UserService } from './user.service';
import { SignupDto } from './dtos/SignupDto';
import { JwtAuthGuard } from '@search/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @Post('signup')
    async signup(@Body() body: SignupDto) {
        return this.userService.postSignup(body);
    }

    @Post('login')
    async login(@Body() body: LoginDto) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}
