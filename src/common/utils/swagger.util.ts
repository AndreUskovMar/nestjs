import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nest Course API')
    .setDescription('Api configuration for Nest Course')
    .setVersion('1.0.0')
    .setContact(
      'Andre',
      'https://github.com/AndreUskovMar',
      'andreuskov2211@gmail.com',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
    customSiteTitle: 'Nest JS Docs',
  });
}
