import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'src/utils/jwt/jwt.payload'
import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CommonService {
  constructor(private readonly jwtService: JwtService) {}

  makeToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload)
  }

  async convertHashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
  }
}
