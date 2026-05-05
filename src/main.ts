import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/loggerGlobal';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(loggerGlobal);
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
    console.log(`Servidor corriendo en el puerto ${process.env.PORT || 3000}`);
}
bootstrap();
