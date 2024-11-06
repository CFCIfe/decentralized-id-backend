import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from './base.schema';
import { ApiProperty } from '@nestjs/swagger';

export type DidEducationInfoDocument = HydratedDocument<DidEducationInfo>;

@Schema()
export class DidEducationInfo extends Base {
  @ApiProperty()
  @Prop({ default: '' })
  did: string;

  @ApiProperty()
  @Prop({ default: '' })
  primarySchool: string;

  @ApiProperty()
  @Prop({ default: '' })
  secondarySchool: string;

  @ApiProperty()
  @Prop({ default: '' })
  tertiaryInstitution: string;

  @ApiProperty()
  @Prop({ default: '' })
  degreeOrDiploma: string;

  @ApiProperty()
  @Prop({ default: '' })
  graduationDate: string;

  @ApiProperty()
  @Prop({ default: '' })
  additionalCertifications: string;
}

export const DidEducationInfoSchema = SchemaFactory.createForClass(DidEducationInfo);
