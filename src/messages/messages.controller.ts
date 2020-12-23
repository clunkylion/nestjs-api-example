import {
  Body,
  Controller,
  Post,
  Delete,
  Put,
  Get,
  Res,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { response } from 'express';
import { CreateMessageDto } from './DTO/create-message-dto';
import { MessagesService } from './messages.service';
@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Res() response) {
    try {
      const messageCreated = await this.messageService.createMessage(
        createMessageDto,
      );
      return response.status(200).json('Mensaje Creado Correctamente');
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Get()
  getAll(@Res() response) {
    this.messageService
      .getAll()
      .then((messageList) => {
        response.status(HttpStatus.OK).json(messageList);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Error la obtener el mensaje' });
      });
    return 'Messages List';
  }
  @Get(':id')
  async getById(@Res() response, @Param('id') messageId) {
    try {
      const messageById = await this.messageService.getById(messageId);
      return response.status(HttpStatus.OK).json({
        data: messageById,
        message: 'Mensaje encontrado',
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Put(':id')
  async update(
    @Body() updateMessageDto: CreateMessageDto,
    @Res() response,
    @Param('id') messageId,
  ) {
    try {
      const messageupdated = await this.messageService.updateMessage(
        messageId,
        updateMessageDto,
      );
      return response.status(HttpStatus.ACCEPTED).json('Mensaje Actualizado');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete(':id')
  async delete(@Res() response, @Param('id') messageId) {
    try {
      const messageDeleted = await this.messageService.deleteMessage(messageId);
      return response.status(HttpStatus.OK).json('Mensaje Eliminado');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
