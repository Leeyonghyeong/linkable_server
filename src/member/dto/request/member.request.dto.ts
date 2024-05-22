import { ApiProperty } from '@nestjs/swagger'

export class MemberSignupRequestDTO {
  @ApiProperty({
    description: '회원 ID',
  })
  id: string

  @ApiProperty({
    description: '이름',
  })
  userName: string

  @ApiProperty({
    description: '전화번호',
  })
  phoneNumber: string

  @ApiProperty({
    description: '닉네임',
  })
  nickName: string

  @ApiProperty({
    description: '비밀번호',
  })
  password: string
}

export class MemberSignupCheckExistRequestDTO {
  @ApiProperty({
    description: '중복 체크(아이디, 닉네임)',
  })
  checkItem: string
}

export class SendSmsVerifyRequestDTO {
  @ApiProperty({
    description: '전화번호',
  })
  phoneNumber: string
}

export class SmsVerifyCheckRequestDTO {
  @ApiProperty({
    description: '전화번호',
  })
  phoneNumber: string

  @ApiProperty({
    description: '인증번호',
  })
  verifyNumber: string
}
