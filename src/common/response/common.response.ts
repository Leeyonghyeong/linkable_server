import { ApiProperty } from '@nestjs/swagger'

class AccessToken {
  @ApiProperty({
    description: 'AccessToken',
  })
  accessToken: string
}

export class CommonResponse {
  @ApiProperty({
    description: '성공 여부',
  })
  success: boolean

  @ApiProperty({
    description: '에러 메시지',
  })
  errorMessage: string
}

export class BooleanReturnResponse extends CommonResponse {
  @ApiProperty({
    description: 'Boolean형 Retrun',
  })
  data: boolean
}

export class AccessTokenResponse extends CommonResponse {
  @ApiProperty({
    description: 'AccessToken Value',
    type: AccessToken,
  })
  data: AccessToken
}
