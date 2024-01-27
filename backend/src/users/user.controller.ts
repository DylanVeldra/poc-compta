import { JwtTwoFactorGuard } from '@auth/2FA/jwt-two-factor.guard';
import { I18NResponse } from '@utils/response.dto';
import {
  Controller,
  UseGuards,
  Get,
  HttpStatus,
  Patch,
  Param,
  ParseIntPipe,
  Query,
  Req,
  Body,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from './user.dto';
import { UserService } from './user.service';
import { AdminGuard } from '@auth/admin.guard';
import { RegisterService } from './register.service';
import { USER_STATUS } from '@prisma/client';
import { QueryEnumPipe } from '@utils/pipes/QueryEnumPipe';
import { ApiPagination } from '@utils/decorators/pagination.decorator';
import { Pagination, PaginationDto } from '@utils/pipes/pagination';
import { RequestContext } from '@utils/types';
import { REQUEST } from '@nestjs/core';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtTwoFactorGuard)
export class UserController {
  constructor(
    @Inject(REQUEST) private readonly requestContext: RequestContext,
    private userService: UserService,
    private registerService: RegisterService,
  ) {}

  @Patch(':id/status/reject')
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Block an user account',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User ID',
  })
  async rejectUser(@Param('id', ParseIntPipe) id: number) {
    await this.registerService.changeRegistrationStatus(id, USER_STATUS.BANNED);
    return new I18NResponse('OK');
  }

  @Patch(':id/status/accept')
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Validate user registration',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User ID',
  })
  async validateUser(@Param('id', ParseIntPipe) id: number) {
    await this.registerService.changeRegistrationStatus(
      id,
      USER_STATUS.ALLOWED,
    );
    return new I18NResponse('OK');
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Update user informations',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User ID',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return new I18NResponse('OK', await this.userService.updateUser(id, body));
  }

  @Get('all')
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Get all users informations',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'All users with theirs informations',
  })
  @ApiQuery({
    name: 'status',
    description: 'User registration status',
    enum: USER_STATUS,
    required: false,
  })
  @ApiPagination()
  async all(
    @Pagination() pagination: PaginationDto,
    @Query(
      'status',
      new QueryEnumPipe(USER_STATUS, {
        optional: true,
      }),
    )
    status?: USER_STATUS,
  ) {
    const res = await this.userService.getAllUsers(pagination, status);
    return new I18NResponse('OK', {
      ...res,
      data: res.data.map((user) => ({
        ...user,
        tags: user.tags.map((tag) => tag.tag),
      })),
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Get the user informations',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'Current logged user informations',
  })
  async me() {
    const { firstname, lastname, phoneNumber, email, birthDate } =
      await this.userService.findById(this.requestContext.context.user.id);
    return new I18NResponse('OK', {
      firstname,
      lastname,
      phoneNumber,
      email,
      birthDate,
    });
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Get the user informations (administer only)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: I18NResponse,
    description: 'User informations',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'User ID',
  })
  async get(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findByIdWithTags(id);
    return new I18NResponse('OK', user);
  }
}
