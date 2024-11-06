import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from './base.schema';
import { ApiProperty } from '@nestjs/swagger';

export type DidPersonalInfoDocument = HydratedDocument<DidPersonalInfo>;

@Schema()
export class DidPersonalInfo extends Base {
  @ApiProperty()
  @Prop({ default: '' })
  did: string;

  @ApiProperty()
  @Prop({ default: '' })
  fullName: string;

  @ApiProperty()
  @Prop({ default: '' })
  dateOfBirth: string;

  @ApiProperty()
  @Prop({ default: '' })
  gender: string;

  @ApiProperty()
  @Prop({ default: '' })
  nationalIdentificationNumber: string;

  @ApiProperty()
  @Prop({ default: '' })
  phoneNumber: string;

  @ApiProperty()
  @Prop({ default: '' })
  email: string;
}

export const DidPersonalInfoSchema = SchemaFactory.createForClass(DidPersonalInfo);
