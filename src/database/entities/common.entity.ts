import { ApiProperty } from '@nestjs/swagger'
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'uuid',
  })
  uuid: string

  @CreateDateColumn()
  @ApiProperty({
    description: '생성일',
  })
  createdAt: Date

  @UpdateDateColumn()
  @ApiProperty({
    description: '수정일',
  })
  updatedAt: Date
}
