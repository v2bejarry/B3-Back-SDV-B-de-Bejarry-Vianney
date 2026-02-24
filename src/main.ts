import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './contexte/core/http/interceptors/response.interceptor';
import { HttpExceptionFilter } from './contexte/core/http/exception/http-exception.filter';
import { buildGlobalValidationPipe } from './contexte/core/http/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activer le parsing JSON
  app.use((req, res, next) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      if (data) {
        try {
          req.body = JSON.parse(data);
        } catch (e) {
          req.body = {};
        }
      }
      next();
    });
  });
  
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(buildGlobalValidationPipe()); // -> transforme les erreurs DTO en { code, message, fields }
  app.useGlobalFilters(new HttpExceptionFilter()); // -> transforme toutes les erreurs (DomainError, HttpException...) en { code, message, fields?, details? }
  app.useGlobalInterceptors(new ResponseInterceptor()); // -> transforme toutes les reponses OK en { data, meta? }
}
bootstrap();
