import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('API DOCS')
    .setDescription('API 공식 문서')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)
}
