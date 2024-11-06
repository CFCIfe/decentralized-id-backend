import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DidLocalAuthGuard extends AuthGuard('local-did') {}
