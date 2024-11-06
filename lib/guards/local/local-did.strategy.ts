import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DecentralzedIdService } from 'lib/modules/decentralized-id/decentralized-id.service';

@Injectable()
export class LocalDidStrategy extends PassportStrategy(Strategy, 'local-did') {
  constructor(private didService: DecentralzedIdService) {
    super({ usernameField: 'txnBase64', passwordField: 'did' });
  }

  async validate(txnBase64: string, did: string): Promise<any> {
    const user = await this.didService.validateAuthTransaction(txnBase64, did);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
