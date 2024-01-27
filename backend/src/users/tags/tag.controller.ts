import { JwtTwoFactorGuard } from '@auth/2FA/jwt-two-factor.guard';
import { AdminGuard } from '@auth/admin.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { I18NResponse } from '@utils/response.dto';
import { CreateTagDto, TagDto, UpdateTagDto } from './tag.dto';
import { TagService } from './tag.service';

@Controller()
@ApiTags('Tag')
@ApiBearerAuth()
@UseGuards(AdminGuard)
@UseGuards(JwtTwoFactorGuard)
export class TagController {
  constructor(private tagService: TagService) {}

  @Post('tag')
  @ApiOperation({
    summary: 'Create a new tag',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'The new tag',
  })
  @ApiBody({
    type: CreateTagDto,
    description: 'Tag informations to create',
  })
  async create(@Body() input: CreateTagDto) {
    const tag = await this.tagService.create(input);
    return new I18NResponse('OK', tag);
  }

  @Delete('tag/:id')
  @ApiOperation({
    summary: 'Delete a specific tag',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Delete confirmation',
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<I18NResponse<null>> {
    await this.tagService.delete(id);
    return new I18NResponse('OK');
  }

  @Patch('tag/:id')
  @ApiOperation({
    summary: 'Edit properties in a specific tag',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Edit confirmation',
  })
  @ApiBody({
    type: UpdateTagDto,
    description: 'Email change request',
  })
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateTagDto,
  ) {
    return new I18NResponse('OK', await this.tagService.edit(id, input));
  }

  @Put('tag/:id/link/:userId')
  @ApiOperation({
    summary: 'Link a tag to an user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Tag linked',
  })
  async link(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<I18NResponse<null>> {
    await this.tagService.link(id, userId);
    return new I18NResponse('OK');
  }

  @Put('tag/:id/unlink/:userId')
  @ApiOperation({
    summary: 'Remove link of a tag to an user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Tag unlink',
  })
  async unlink(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<I18NResponse<null>> {
    await this.tagService.unlink(id, userId);
    return new I18NResponse('OK');
  }

  @Get('tag')
  @ApiOperation({
    summary: 'Get all available tags',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'All tags objects',
  })
  async getAllTags() {
    return new I18NResponse('OK', await this.tagService.getAllTags());
  }

  @Get('user/:id/tags')
  @ApiOperation({
    summary: 'Get all tags linked to a specific user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'All tags linked',
  })
  async getTagsByUser(@Param('id', ParseIntPipe) id: number) {
    return new I18NResponse('OK', await this.tagService.getTagsByUser(id));
  }

  @Get('tag/:id')
  @ApiOperation({
    summary: 'Get one tag',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'The tag informations',
  })
  async getTag(@Param('id', ParseIntPipe) id: number) {
    return new I18NResponse('OK', await this.tagService.getById(id));
  }

  @Get('tag/:id/users')
  @ApiOperation({
    summary: 'Get all users linked to a specific tag',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Users linked',
  })
  async getUsersByTags(@Param('id', ParseIntPipe) id: number) {
    return new I18NResponse('OK', await this.tagService.getUsersByTag(id));
  }
}
