import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, 
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
    });
  }

  // Lo que retorna aquí se inyecta en req.user
  async validate(payload: any) {
    return { userId: payload.sub, role: payload.role };
  }
}
