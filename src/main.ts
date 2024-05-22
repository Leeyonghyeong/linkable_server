import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from './utils/swagger.util'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('/api')
  app.enableCors({
    origin: process.env.DEV_TYPE === 'dev' ? '*' : /pin[-]hi\.co\.kr/,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  if (process.env.DEV_TYPE === 'dev') setupSwagger(app)

  const PORT = process.env.WEB_PORT
  await app.listen(PORT || 3000)
}
bootstrap()
