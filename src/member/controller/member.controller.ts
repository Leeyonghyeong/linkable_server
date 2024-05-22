import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MemberSerivce } from '../service/member.service'
import {
  AccessTokenResponse,
  BooleanReturnResponse,
  CommonResponse,
} from 'src/common/response/common.response'
import {
  MemberSignupCheckExistRequestDTO,
  MemberSignupRequestDTO,
  SendSmsVerifyRequestDTO,
  SmsVerifyCheckRequestDTO,
} from '../dto/request/member.request.dto'

@ApiTags('사용자 - 멤버 API')
@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberSerivce) {}

  @Get('id-check')
  @ApiOperation({
    summary: '아이디 중복 확인',
  })
  @ApiResponse({
    type: BooleanReturnResponse,
  })
  async memberSignupIDCheckExist(
    @Query() memberSignupCheckExistRequestDTO: MemberSignupCheckExistRequestDTO,
  ): Promise<BooleanReturnResponse | CommonResponse> {
    return await this.memberService.memberSignupIDCheckExist(
      memberSignupCheckExistRequestDTO,
    )
  }

  @Get('nickname-check')
  @ApiOperation({
    summary: '닉네임 중복 확인',
  })
  @ApiResponse({
    type: BooleanReturnResponse,
  })
  async memberSignupNickNameCheckExist(
    @Query() memberSignupCheckExistRequestDTO: MemberSignupCheckExistRequestDTO,
  ): Promise<BooleanReturnResponse | CommonResponse> {
    return await this.memberService.memberSignupNickNameCheckExist(
      memberSignupCheckExistRequestDTO,
    )
  }

  @Post('send/sms/verify')
  @ApiOperation({
    summary: '회원 인증 문자 발송',
  })
  @ApiBody({
    type: SendSmsVerifyRequestDTO,
  })
  @ApiResponse({
    type: CommonResponse,
  })
  async sendSmsVerify(
    @Body() sendSmsVerifyRequestDTO: SendSmsVerifyRequestDTO,
  ): Promise<CommonResponse> {
    return await this.memberService.sendSmsVerify(sendSmsVerifyRequestDTO)
  }

  @Post('verify-check')
  @ApiOperation({
    summary: '인증번호 확인',
  })
  @ApiBody({
    type: SmsVerifyCheckRequestDTO,
  })
  @ApiResponse({
    type: CommonResponse,
  })
  async verifyNumberCheck(
    @Body() smsVerifyCheckRequestDTO: SmsVerifyCheckRequestDTO,
  ): Promise<CommonResponse> {
    return await this.memberService.verifyNumberCheck(smsVerifyCheckRequestDTO)
  }

  @Post('signup')
  @ApiOperation({
    summary: '사용자 회원 가입',
  })
  @ApiBody({
    type: MemberSignupRequestDTO,
  })
  @ApiResponse({
    type: AccessTokenResponse,
  })
  async postMemberSignup(
    @Body() memberSignupRequestDTO: MemberSignupRequestDTO,
  ): Promise<AccessTokenResponse | CommonResponse> {
    return await this.memberService.postMemberSignup(memberSignupRequestDTO)
  }
}
