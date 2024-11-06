import { Module } from '@nestjs/common';
import { DecentralzedIdService } from './decentralized-id.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'lib/constants/jwt-constants';
import { LocalDidStrategy } from 'lib/guards/local/local-did.strategy';
import { JwtDidStrategy } from 'lib/guards/jwt/jwt-did.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { DidPersonalInfo, DidPersonalInfoSchema } from 'lib/schema/did-personal-info.schema';
import { DidEducationInfo, DidEducationInfoSchema } from 'lib/schema/did-education-info.schema';
import { DidHealthInfo, DidHealthInfoSchema } from 'lib/schema/did-health-info.schema';

@Module({
  providers: [DecentralzedIdService, LocalDidStrategy, JwtDidStrategy],
  exports: [DecentralzedIdService],
  imports: [
    JwtModule.register({
      secret: jwtConstants.adminSecret,
      signOptions: { expiresIn: '86400s' },
    }),
    MongooseModule.forFeature([
      { name: DidPersonalInfo.name, schema: DidPersonalInfoSchema },
      { name: DidEducationInfo.name, schema: DidEducationInfoSchema },
      { name: DidHealthInfo.name, schema: DidHealthInfoSchema },
    ]),
  ],
})
export class DecentralzedIdModule {}
