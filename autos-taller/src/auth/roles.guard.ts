// src/auth/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler()) || [];
    if (!roles.length) return true;
    const req = ctx.switchToHttp().getRequest();
    const user = req.user; 
    return roles.includes(user?.role);
  }
}
