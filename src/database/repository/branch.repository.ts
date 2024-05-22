import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Branch } from '../entities/branch.entity'

@Injectable()
export class BranchRepository extends Repository<Branch> {
  constructor(dataSource: DataSource) {
    super(Branch, dataSource.createEntityManager())
  }
}
