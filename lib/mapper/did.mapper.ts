import { DidInfoDto } from 'lib/dto/decentralized-id.dto';
import { IdObject } from 'lib/interfaces/mongoose.interface';
import { DidEducationInfo } from 'lib/schema/did-education-info.schema';
import { DidHealthInfo } from 'lib/schema/did-health-info.schema';
import { DidPersonalInfo } from 'lib/schema/did-personal-info.schema';

export const toDidInfoDto = (
  did: string,
  personalInfo?: DidPersonalInfo & IdObject,
  healthInfo?: DidHealthInfo & IdObject,
  educationInfo?: DidEducationInfo & IdObject,
): DidInfoDto => {
  return {
    did,
    personalInfo: {
      fullName: personalInfo?.fullName || '',
      dateOfBirth: personalInfo?.dateOfBirth || '',
      gender: personalInfo?.gender || '',
      nationalIdentificationNumber: personalInfo?.nationalIdentificationNumber || '',
      email: personalInfo?.email || '',
      phoneNumber: personalInfo?.phoneNumber || '',
    },
    healthInfo: {
      bloodType: healthInfo?.bloodType || '',
      allergies: healthInfo?.allergies || '',
      preExistingConditions: healthInfo?.preExistingConditions || '',
      disability: healthInfo?.disability || '',
      healthInsuranceProvider: healthInfo?.healthInsuranceProvider || '',
      height: healthInfo?.height || '',
      weight: healthInfo?.weight || '',
    },
    educationInfo: {
      primarySchool: educationInfo?.primarySchool || '',
      secondarySchool: educationInfo?.secondarySchool || '',
      tertiaryInstitution: educationInfo?.tertiaryInstitution || '',
      degreeOrDiploma: educationInfo?.degreeOrDiploma || '',
      graduationDate: educationInfo?.graduationDate || '',
      additionalCertifications: educationInfo?.additionalCertifications || '',
    },
  };
};
