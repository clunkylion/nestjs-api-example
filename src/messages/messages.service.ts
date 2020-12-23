import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './DTO/create-message-dto';
import { Message } from './Entities/mesagge.entity';
@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  async getAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }
  async getById(id: number): Promise<any> {
    return await this.messageRepository.find({ where: { id: id } });
  }
  async createMessage(message: CreateMessageDto): Promise<Message> {
    const newMessage = new Message();
    newMessage.message = message.message;
    newMessage.nickname = message.nickname;
    return this.messageRepository.save(newMessage);
  }
  async updateMessage(id: number, message: CreateMessageDto): Promise<Message> {
    const updateMessage = await this.messageRepository.findOne(id);
    updateMessage.nickname = message.nickname;
    updateMessage.message = message.message;
    return await this.messageRepository.save(updateMessage);
  }
  async deleteMessage(id: number): Promise<any> {
    return await this.messageRepository.delete(id);
  }
}
