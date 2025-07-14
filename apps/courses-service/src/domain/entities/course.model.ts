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
  HasMany,
} from 'sequelize-typescript';
import { Module } from './module.model';

@Table({
  tableName: 'courses',
  timestamps: true,
})
export class Course extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  instructorId: string;

  @AllowNull(false)
  @Default('draft')
  @Column(DataType.ENUM('draft', 'published', 'archived'))
  status: 'draft' | 'published' | 'archived';

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @HasMany(() => Module)
  modules?: Module[];
}
