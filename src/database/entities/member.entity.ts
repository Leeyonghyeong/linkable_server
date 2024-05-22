import { Column, Entity } from 'typeorm'
import { CommonEntity } from './common.entity'

@Entity({
  comment: '일반 회원 테이블',
})
export class Member extends CommonEntity {
  @Column({
    comment: '회원명',
  })
  userName: string
}
