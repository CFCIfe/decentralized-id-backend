import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DidJwtAuthGuard extends AuthGuard('jwt-did') {}
