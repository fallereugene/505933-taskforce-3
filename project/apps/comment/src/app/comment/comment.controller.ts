import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';

@ApiTags('Comment service')
@Controller({
  version: '1',
  path: 'comment',
})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
}
