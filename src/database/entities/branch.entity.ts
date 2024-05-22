import { Entity } from 'typeorm'
import { CommonEntity } from './common.entity'

@Entity({
  comment: '지점 회원 테이블',
})
export class Branch extends CommonEntity {}
