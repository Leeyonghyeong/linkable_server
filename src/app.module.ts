import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Member } from './database/entities/member.entity'
import { Admin } from './database/entities/admin.entity'
import { Branch } from './database/entities/branch.entity'
import { MemberModule } from './member/member.module'
import { AdminModule } from './admin/admin.module'
import { BranchModule } from './branch/branch.module'
import { RouterModule } from '@nestjs/core'
import { CommonModule } from './common/common.module'
import { Verify } from './database/entities/verify.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      timezone: 'local',
      entities: [Admin, Branch, Member, Verify],
      synchronize: process.env.DEV_TYPE === 'dev' ? true : false,
      logging: process.env.DEV_TYPE === 'dev' ? true : false,
    }),
    MemberModule,
    AdminModule,
    BranchModule,
    CommonModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
      {
        path: 'branch',
        module: BranchModule,
      },
      {
        path: 'member',
        module: MemberModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
