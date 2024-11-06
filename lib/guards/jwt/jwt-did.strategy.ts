import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'lib/constants/jwt-constants';
import { DecentralzedIdService } from 'lib/modules/decentralized-id/decentralized-id.service';

@Injectable()
export class JwtDidStrategy extends PassportStrategy(Strategy, 'jwt-did') {
  constructor(private readonly didService: DecentralzedIdService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.adminSecret,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.didService.validateAuthTransaction(payload.txnBase64, payload.did);
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
