import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('conversations')
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  @Post()
  create() {
    return this.chat.createConversation();
  }

  @Get()
  list() {
    return this.chat.listConversations();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.chat.getConversation(id);
  }

  // Streams the assistant reply as plain text chunks; the React client reads
  // the response body incrementally and appends tokens as they arrive.
  @Post(':id/messages')
  async send(
    @Param('id') id: string,
    @Body() dto: SendMessageDto,
    @Res() res: Response,
  ) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');

    try {
      for await (const chunk of this.chat.streamReply(id, dto.message)) {
        res.write(chunk);
      }
    } catch (err) {
      // If the stream hasn't started, surface a clean error; otherwise just end.
      if (!res.headersSent) {
        res.status(500);
      }
      res.write(`\n[error] ${(err as Error).message}`);
    } finally {
      res.end();
    }
  }
}
