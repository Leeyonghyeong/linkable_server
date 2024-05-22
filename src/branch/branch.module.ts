import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { CommonModule } from 'src/common/common.module'

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), CommonModule],
})
export class BranchModule {}
