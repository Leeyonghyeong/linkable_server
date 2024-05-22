import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Member } from '../entities/member.entity'

@Injectable()
export class MemberRepository extends Repository<Member> {
  constructor(dataSource: DataSource) {
    super(Member, dataSource.createEntityManager())
  }
}
