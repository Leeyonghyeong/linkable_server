import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { JwtPayload } from './jwt.payload'

export const GetJwtToken = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest()
    return req.user
  },
)
