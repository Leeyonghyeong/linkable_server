import { Entity } from 'typeorm'
import { CommonEntity } from './common.entity'

@Entity({
  comment: '관리자 회원 테이블',
})
export class Admin extends CommonEntity {}
