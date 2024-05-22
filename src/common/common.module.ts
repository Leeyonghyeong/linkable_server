import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { CommonService } from './service/common.service'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 60 * 60 * 24 * 365,
      },
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
