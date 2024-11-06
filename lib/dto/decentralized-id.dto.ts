import { ApiProperty } from '@nestjs/swagger';

export class DidLoginDto {
  @ApiProperty()
  txnBase64: string;

  @ApiProperty()
  did: string;
}

export class DidPersonalInfoDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  nationalIdentificationNumber: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;
}

export class CreateOrEditPersonalInfoDto {
  @ApiProperty()
  fullName?: string;

  @ApiProperty()
  dateOfBirth?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  nationalIdentificationNumber?: string;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  email?: string;
}

export class DidHealthInfoDto {
  @ApiProperty()
  bloodType: string;

  @ApiProperty()
  allergies: string;

  @ApiProperty()
  preExistingConditions: string;

  @ApiProperty()
  disability: string;

  @ApiProperty()
  healthInsuranceProvider: string;

  @ApiProperty()
  height: string;

  @ApiProperty()
  weight: string;
}

export class CreateOrEditHealthInfoDto {
  @ApiProperty()
  bloodType?: string;

  @ApiProperty()
  allergies?: string;

  @ApiProperty()
  preExistingConditions?: string;

  @ApiProperty()
  disability?: string;

  @ApiProperty()
  healthInsuranceProvider?: string;

  @ApiProperty()
  height?: string;

  @ApiProperty()
  weight?: string;
}

export class DidEducationInfoDto {
  @ApiProperty()
  primarySchool: string;

  @ApiProperty()
  secondarySchool: string;

  @ApiProperty()
  tertiaryInstitution: string;

  @ApiProperty()
  degreeOrDiploma: string;

  @ApiProperty()
  graduationDate: string;

  @ApiProperty()
  additionalCertifications: string;
}

export class CreateOrEditEducationInfoDto {
  @ApiProperty()
  primarySchool?: string;

  @ApiProperty()
  secondarySchool?: string;

  @ApiProperty()
  tertiaryInstitution?: string;

  @ApiProperty()
  degreeOrDiploma?: string;

  @ApiProperty()
  graduationDate?: string;

  @ApiProperty()
  additionalCertifications?: string;
}

export class DidInfoDto {
  @ApiProperty()
  did: string;

  @ApiProperty({
    type: DidPersonalInfoDto,
  })
  personalInfo: DidPersonalInfoDto;

  @ApiProperty({
    type: DidHealthInfoDto,
  })
  healthInfo: DidHealthInfoDto;

  @ApiProperty({
    type: DidEducationInfoDto,
  })
  educationInfo: DidEducationInfoDto;
}
