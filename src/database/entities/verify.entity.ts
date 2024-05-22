import { Column, Entity } from 'typeorm'
import { CommonEntity } from './common.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity({
  comment: '인증번호 관리 테이블',
})
export class Verify extends CommonEntity {
  @Column({
    comment: '전화번호',
  })
  @ApiProperty({
    description: '전화번호',
  })
  phoneNumber: string

  @Column({
    comment: '인증번호',
  })
  @ApiProperty({
    description: '인증번호',
  })
  verifyNumber: string

  @Column({
    comment: '인증 번호 만료 시간',
  })
  @ApiProperty({
    description: '인증 번호 만료 시간',
  })
  expire: Date
}
