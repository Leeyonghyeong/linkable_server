import { HttpException, Injectable } from '@nestjs/common'
import { MemberRepository } from 'src/database/repository/member.repository'
import {
  MemberSignupCheckExistRequestDTO,
  MemberSignupRequestDTO,
  SendSmsVerifyRequestDTO,
  SmsVerifyCheckRequestDTO,
} from '../dto/request/member.request.dto'
import {
  AccessTokenResponse,
  BooleanReturnResponse,
  CommonResponse,
} from 'src/common/response/common.response'
import { winstonLogger } from 'src/utils/winston/winston.util'
import { CommonService } from 'src/common/service/common.service'
import { Member } from 'src/database/entities/member.entity'
import axios from 'axios'
import { VerifyRepository } from 'src/database/repository/verify.repository'
import { Verify } from 'src/database/entities/verify.entity'
import { MoreThan } from 'typeorm'

@Injectable()
export class MemberSerivce {
  private readonly _siteName = process.env.SITE_NAME

  private readonly _nhnCloudUrl = process.env.NHN_CLOUD_URL
  private readonly _nhnCloudAppKey = process.env.NHN_CLOUD_APP_KEY
  private readonly _nhnCloudSecretKey = process.env.NHN_CLOUD_SECRET_KEY
  private readonly _nhnCloudSendNo = process.env.NHN_CLOUD_SEND_NO

  constructor(
    private readonly commonService: CommonService,
    private readonly memberRepoisitory: MemberRepository,
    private readonly verifyRepository: VerifyRepository,
  ) {}

  async memberSignupIDCheckExist(
    memberSignupCheckExistRequestDTO: MemberSignupCheckExistRequestDTO,
  ): Promise<BooleanReturnResponse | CommonResponse> {
    try {
      console.log(process.env.NHN_CLOUD_URL)
      const { checkItem } = memberSignupCheckExistRequestDTO

      const member: boolean = await this.memberRepoisitory.exists({
        where: {
          isDelete: false,
          id: checkItem,
        },
      })

      return { data: member, success: true, errorMessage: '' }
    } catch (err) {
      const e: Error = err
      winstonLogger.error(e.message)
      return { success: false, errorMessage: e.message }
    }
  }

  async memberSignupNickNameCheckExist(
    memberSignupCheckExistRequestDTO: MemberSignupCheckExistRequestDTO,
  ): Promise<BooleanReturnResponse | CommonResponse> {
    try {
      const { checkItem } = memberSignupCheckExistRequestDTO

      const member: boolean = await this.memberRepoisitory.exists({
        where: {
          isDelete: false,
          nickName: checkItem,
        },
      })

      return { data: member, success: true, errorMessage: '' }
    } catch (err) {
      const e: Error = err
      winstonLogger.error(e.message)
      return { success: false, errorMessage: e.message }
    }
  }

  async sendSmsVerify(
    sendSmsVerifyRequestDTO: SendSmsVerifyRequestDTO,
  ): Promise<CommonResponse> {
    try {
      const { phoneNumber } = sendSmsVerifyRequestDTO
      const url: string = `${this._nhnCloudUrl}/sms/v3.0/appKeys/${this._nhnCloudAppKey}/sender/sms`

      const makeVerifyNumber = String(
        Math.floor(Math.random() * 1000000),
      ).padStart(6, '0')

      const headers = {
        headers: {
          'X-Secret-Key': this._nhnCloudSecretKey,
        },
      }

      const requestData = {
        body: `[${this._siteName}] Verify Code ${makeVerifyNumber}`,
        sendNo: this._nhnCloudSendNo,
        recipientList: [
          {
            recipientNo: phoneNumber,
            countryCode: '82',
          },
        ],
      }

      const { data } = await axios.post(url, requestData, headers)

      if (data.header.isSuccessful) {
        const expire = new Date()
        expire.setMinutes(expire.getMinutes() + 5)

        const verify: Verify[] = await this.verifyRepository.find({
          where: {
            phoneNumber,
          },
        })

        if (verify.length > 0) {
          await this.verifyRepository.remove(verify)
        }

        await this.verifyRepository.save({
          phoneNumber,
          verifyNumber: makeVerifyNumber,
          expire,
        })

        return { success: true, errorMessage: '' }
      } else {
        throw new HttpException(data.header.resultMessage, 500)
      }
    } catch (err) {
      const e: Error = err
      winstonLogger.error(e.message)
      return { success: false, errorMessage: e.message }
    }
  }

  async verifyNumberCheck(
    smsVerifyCheckRequestDTO: SmsVerifyCheckRequestDTO,
  ): Promise<CommonResponse> {
    try {
      const { phoneNumber, verifyNumber } = smsVerifyCheckRequestDTO

      const verify: Verify = await this.verifyRepository.findOne({
        where: {
          phoneNumber,
          verifyNumber,
          expire: MoreThan(new Date()),
        },
      })

      if (verify) {
        await this.verifyRepository.remove(verify)

        return { success: true, errorMessage: '' }
      } else {
        throw new HttpException('유효한 인증번호가 아닙니다', 500)
      }
    } catch (err) {
      const e: Error = err
      winstonLogger.error(e.message)
      return { success: false, errorMessage: e.message }
    }
  }

  async postMemberSignup(
    memberSignupRequestDTO: MemberSignupRequestDTO,
  ): Promise<AccessTokenResponse | CommonResponse> {
    try {
      const { password } = memberSignupRequestDTO

      const hashPassword =
        await this.commonService.convertHashPassword(password)

      memberSignupRequestDTO.password = hashPassword

      const member: Member = await this.memberRepoisitory.save(
        memberSignupRequestDTO,
      )

      const accessToken = this.commonService.makeToken({
        uuid: member.uuid,
      })

      return { data: { accessToken }, success: true, errorMessage: '' }
    } catch (err) {
      const e: Error = err
      winstonLogger.error(e.message)
      return { success: false, errorMessage: e.message }
    }
  }
}
