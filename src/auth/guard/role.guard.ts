import { CanActivate, ExecutionContext } from "@nestjs/common";
import { log } from "console";
import { Request } from "express";

export class RoleGuard implements CanActivate {
    private role: string;
    constructor(role: string) {
        this.role = role;
    }
    canActivate(context: ExecutionContext): boolean {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        console.log('role',request.user);
        const user: any = request.user;        
        if (request.user && user.role == this.role) return true;


        return false;
    }
}