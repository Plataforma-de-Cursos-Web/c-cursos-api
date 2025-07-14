import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Module } from './module.model';

@Table({
  tableName: 'materials',
  timestamps: true,
})
export class Material extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Module)
  @AllowNull(false)
  @Column(DataType.UUID)
  moduleId: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  title: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.ENUM('video', 'pdf', 'document', 'link'))
  type: 'video' | 'pdf' | 'document' | 'link';

  @AllowNull(false)
  @Column(DataType.STRING(500))
  url: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  duration: number;

  @AllowNull(true)
  @Column(DataType.BIGINT)
  fileSize: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  order: number;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @BelongsTo(() => Module)
  module?: Module;
}
