import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Verify } from '../entities/verify.entity'

@Injectable()
export class VerifyRepository extends Repository<Verify> {
  constructor(dataSource: DataSource) {
    super(Verify, dataSource.createEntityManager())
  }
}
