import { Column, Entity } from 'typeorm'
import { CommonEntity } from './common.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity({
  comment: '일반 회원 테이블',
})
export class Member extends CommonEntity {
  @Column({
    comment: '회원 ID',
  })
  @ApiProperty({
    description: '회원 ID',
  })
  id: string

  @Column({
    comment: '회원명',
  })
  @ApiProperty({
    description: '회원명',
  })
  userName: string

  @Column({
    comment: '전화번호',
  })
  @ApiProperty({
    description: '전화번호',
  })
  phoneNumber: string

  @Column({
    comment: '닉네임',
  })
  @ApiProperty({
    description: '닉네임',
  })
  nickName: string

  @Column({
    comment: '비밀번호',
  })
  @ApiProperty({
    description: '비밀번호',
  })
  password: string

  @Column({
    comment: '포인트',
    default: 0,
  })
  @ApiProperty({
    description: '포인트',
  })
  point: number

  @Column({
    comment: '탈퇴 여부',
    default: false,
  })
  @ApiProperty({
    description: '탈퇴 여부',
  })
  isDelete: boolean

  @Column({
    comment: '탈퇴 일자',
    nullable: true,
  })
  @ApiProperty({
    description: '탈퇴 일자',
  })
  deletedAt: Date
}
