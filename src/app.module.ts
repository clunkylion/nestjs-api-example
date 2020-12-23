import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages/messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages/messages.service';
import { Message } from './messages/Entities/mesagge.entity';
@Module({
  //modulos o referencias
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sendmeapp_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Message]),
  ],
  //todos los controladores del modulo, un modulo agrupa varios
  controllers: [AppController, MessagesController],
  //los servicios donde se encuentras los metodos de acceso a los datos
  providers: [AppService, MessagesService],
})
export class AppModule {}
