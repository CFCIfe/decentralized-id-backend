import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ed25519 } from '@noble/curves/ed25519';
import algosdk from 'algosdk';
import {
  CreateOrEditEducationInfoDto,
  CreateOrEditHealthInfoDto,
  CreateOrEditPersonalInfoDto,
  DidInfoDto,
} from 'lib/dto/decentralized-id.dto';
import { toDidInfoDto } from 'lib/mapper/did.mapper';
import { DidEducationInfo, DidEducationInfoDocument } from 'lib/schema/did-education-info.schema';
import { DidHealthInfo, DidHealthInfoDocument } from 'lib/schema/did-health-info.schema';
import { DidPersonalInfo, DidPersonalInfoDocument } from 'lib/schema/did-personal-info.schema';
import { resolveDidIntoComponents } from 'lib/utils/resolve-did-into-components';
import { Model } from 'mongoose';

@Injectable()
export class DecentralzedIdService {
  private readonly logger = new Logger(DecentralzedIdService.name);

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(DidPersonalInfo.name) private personalInfoModel: Model<DidPersonalInfoDocument>,
    @InjectModel(DidHealthInfo.name) private healthInfoModel: Model<DidHealthInfoDocument>,
    @InjectModel(DidEducationInfo.name) private educationInfoModel: Model<DidEducationInfoDocument>,
  ) {}

  async validateAuthTransaction(txnBase64: string, did: string) {
    try {
      const txnByteArray = new Uint8Array(Buffer.from(txnBase64, 'base64'));
      const decodedTxn = algosdk.decodeSignedTransaction(txnByteArray);

      const from = algosdk.encodeAddress(decodedTxn.txn.sender.publicKey);
      const to = algosdk.encodeAddress(decodedTxn.txn.payment?.receiver.publicKey);

      if (from !== to) {
        throw new UnauthorizedException('Sender and receiver of auth transaction do not match');
      }

      const publicKeyHex = resolveDidIntoComponents(did).publicKey;

      const isValid = ed25519.verify(
        decodedTxn.sig!,
        decodedTxn.txn!.bytesToSign(),
        new Uint8Array(Buffer.from(publicKeyHex, 'hex')),
      );

      if (!isValid) {
        throw new UnauthorizedException('Invalid auth transaction signer');
      } else {
        return {
          address: from,
          did,
        };
      }
    } catch (error) {
      this.logger.error(`Error validating auth transaction: ${error.message}`);
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async loginUser(user: any) {
    return {
      accessToken: this.jwtService.sign(user, { expiresIn: 86400 }),
      expiresIn: 86400,
    };
  }

  async getDidInfo(did: string): Promise<DidInfoDto> {
    const personalInfo = await this.personalInfoModel.findOne({ did });
    const healthInfo = await this.healthInfoModel.findOne({ did });
    const educationInfo = await this.educationInfoModel.findOne({ did });

    return toDidInfoDto(did, personalInfo, healthInfo, educationInfo);
  }

  async createOrUpdatePersonalInfo(
    did: string,
    dto: CreateOrEditPersonalInfoDto,
  ): Promise<DidInfoDto> {
    const existingPersonalInfo = await this.personalInfoModel.findOne({ did });

    if (existingPersonalInfo) {
      existingPersonalInfo.fullName = dto.fullName || existingPersonalInfo.fullName;
      existingPersonalInfo.dateOfBirth = dto.dateOfBirth || existingPersonalInfo.dateOfBirth;
      existingPersonalInfo.gender = dto.gender || existingPersonalInfo.gender;
      existingPersonalInfo.nationalIdentificationNumber =
        dto.nationalIdentificationNumber || existingPersonalInfo.nationalIdentificationNumber;
      existingPersonalInfo.phoneNumber = dto.phoneNumber || existingPersonalInfo.phoneNumber;
      existingPersonalInfo.email = dto.email || existingPersonalInfo.email;

      await existingPersonalInfo.save();
    } else {
      const newPersonalInfo = new this.personalInfoModel({
        did,
        ...dto,
      });

      await newPersonalInfo.save();
    }

    return this.getDidInfo(did);
  }

  async createOrUpdateHealthInfo(did: string, dto: CreateOrEditHealthInfoDto): Promise<DidInfoDto> {
    const existingHealthInfo = await this.healthInfoModel.findOne({ did });

    if (existingHealthInfo) {
      existingHealthInfo.bloodType = dto.bloodType || existingHealthInfo.bloodType;
      existingHealthInfo.allergies = dto.allergies || existingHealthInfo.allergies;
      existingHealthInfo.preExistingConditions =
        dto.preExistingConditions || existingHealthInfo.preExistingConditions;
      existingHealthInfo.disability = dto.disability || existingHealthInfo.disability;
      existingHealthInfo.healthInsuranceProvider =
        dto.healthInsuranceProvider || existingHealthInfo.healthInsuranceProvider;
      existingHealthInfo.height = dto.height || existingHealthInfo.height;
      existingHealthInfo.weight = dto.weight || existingHealthInfo.weight;

      await existingHealthInfo.save();
    } else {
      const newHealthInfo = new this.healthInfoModel({
        did,
        ...dto,
      });

      await newHealthInfo.save();
    }

    return this.getDidInfo(did);
  }

  async createOrUpdateEducationInfo(
    did: string,
    dto: CreateOrEditEducationInfoDto,
  ): Promise<DidInfoDto> {
    const existingEducationInfo = await this.educationInfoModel.findOne({ did });

    if (existingEducationInfo) {
      existingEducationInfo.primarySchool =
        dto.primarySchool || existingEducationInfo.primarySchool;
      existingEducationInfo.secondarySchool =
        dto.secondarySchool || existingEducationInfo.secondarySchool;
      existingEducationInfo.tertiaryInstitution =
        dto.tertiaryInstitution || existingEducationInfo.tertiaryInstitution;
      existingEducationInfo.degreeOrDiploma =
        dto.degreeOrDiploma || existingEducationInfo.degreeOrDiploma;
      existingEducationInfo.graduationDate =
        dto.graduationDate || existingEducationInfo.graduationDate;
      existingEducationInfo.additionalCertifications =
        dto.additionalCertifications || existingEducationInfo.additionalCertifications;

      await existingEducationInfo.save();
    } else {
      const newEducationInfo = new this.educationInfoModel({
        did,
        ...dto,
      });

      await newEducationInfo.save();
    }

    return this.getDidInfo(did);
  }
}
