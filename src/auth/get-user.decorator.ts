import { createParamDecorator } from "@nestjs/common";
import { User } from './user.entity';

// this custom decorator is used for retrieving user data from the request

export const GetUser = createParamDecorator((data, req): User => {
    return req.user;
});
