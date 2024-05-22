import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { MemberController } from './controller/member.controller'
import { MemberSerivce } from './service/member.service'
import { MemberRepository } from 'src/database/repository/member.repository'
import { CommonModule } from 'src/common/common.module'
import { VerifyRepository } from 'src/database/repository/verify.repository'

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), CommonModule],
  controllers: [MemberController],
  providers: [MemberSerivce, MemberRepository, VerifyRepository],
})
export class MemberModule {}
