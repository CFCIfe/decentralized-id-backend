import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
  Request,
  Post,
  UseGuards,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DecentralzedIdService } from 'lib/modules/decentralized-id/decentralized-id.service';
import {
  CreateOrEditEducationInfoDto,
  CreateOrEditHealthInfoDto,
  CreateOrEditPersonalInfoDto,
  DidInfoDto,
  DidLoginDto,
} from 'lib/dto/decentralized-id.dto';
import { DidLocalAuthGuard } from 'lib/guards/local/did-local-auth.guard';
import { DidJwtAuthGuard } from 'lib/guards/jwt/did-jwt-auth.guard';

@ApiTags('Decentralized ID')
@Controller('did')
@UseInterceptors(ClassSerializerInterceptor)
export class DecentralizedIdController {
  constructor(private readonly decentralizedIdService: DecentralzedIdService) {}

  @ApiOperation({ summary: 'Sign into account by verifying ownership of did' })
  @ApiBearerAuth('Bearer')
  @ApiBody({ type: DidLoginDto })
  @UseGuards(DidLocalAuthGuard)
  @Post('auth/login')
  logInAdmin(@Request() req: any) {
    return this.decentralizedIdService.loginUser(req.body);
  }

  @ApiOperation({ summary: 'Get profile information' })
  @ApiBearerAuth('Bearer')
  @ApiResponse({ type: DidInfoDto })
  @UseGuards(DidJwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return this.decentralizedIdService.getDidInfo(req.user.did);
  }

  @ApiOperation({ summary: 'Create or update personal information' })
  @ApiBearerAuth('Bearer')
  @ApiResponse({ type: DidInfoDto })
  @ApiBody({ type: CreateOrEditPersonalInfoDto })
  @UseGuards(DidJwtAuthGuard)
  @Put('profile/personal-information')
  updatePersonalInfo(@Request() req: any, @Body() body: CreateOrEditPersonalInfoDto) {
    return this.decentralizedIdService.createOrUpdatePersonalInfo(req.user.did, body);
  }

  @ApiOperation({ summary: 'Create or update health information' })
  @ApiBearerAuth('Bearer')
  @ApiResponse({ type: DidInfoDto })
  @ApiBody({ type: CreateOrEditHealthInfoDto })
  @UseGuards(DidJwtAuthGuard)
  @Put('profile/health-information')
  updateHealthInfo(@Request() req: any, @Body() body: CreateOrEditHealthInfoDto) {
    return this.decentralizedIdService.createOrUpdateHealthInfo(req.user.did, body);
  }

  @ApiOperation({ summary: 'Create or update education information' })
  @ApiBearerAuth('Bearer')
  @ApiResponse({ type: DidInfoDto })
  @ApiBody({ type: CreateOrEditEducationInfoDto })
  @UseGuards(DidJwtAuthGuard)
  @Put('profile/education-information')
  updateEducationInfo(@Request() req: any, @Body() body: CreateOrEditEducationInfoDto) {
    return this.decentralizedIdService.createOrUpdateEducationInfo(req.user.did, body);
  }
}
