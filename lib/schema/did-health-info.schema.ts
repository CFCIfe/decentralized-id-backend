import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from './base.schema';
import { ApiProperty } from '@nestjs/swagger';

export type DidHealthInfoDocument = HydratedDocument<DidHealthInfo>;

@Schema()
export class DidHealthInfo extends Base {
  @ApiProperty()
  @Prop({ default: '' })
  did: string;

  @ApiProperty()
  @Prop({ default: '' })
  bloodType: string;

  @ApiProperty()
  @Prop({ default: '' })
  allergies: string;

  @ApiProperty()
  @Prop({ default: '' })
  preExistingConditions: string;

  @ApiProperty()
  @Prop({ default: '' })
  disability: string;

  @ApiProperty()
  @Prop({ default: '' })
  healthInsuranceProvider: string;

  @ApiProperty()
  @Prop({ default: '' })
  height: string;

  @ApiProperty()
  @Prop({ default: '' })
  weight: string;
}

export const DidHealthInfoSchema = SchemaFactory.createForClass(DidHealthInfo);
