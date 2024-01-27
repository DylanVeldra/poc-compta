import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateTagDto, UpdateTagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  create(input: CreateTagDto) {
    return this.prisma.tag.create({
      data: input,
    });
  }

  delete(id: number) {
    return this.prisma.tag.delete({
      where: {
        id,
      },
    });
  }

  edit(id: number, input: UpdateTagDto) {
    return this.prisma.tag.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  link(id: number, userId: number) {
    return this.prisma.tagsOnUsers.create({
      data: {
        tagId: id,
        userId,
      },
    });
  }

  unlink(id: number, userId: number) {
    return this.prisma.tagsOnUsers.delete({
      where: {
        tagId_userId: {
          tagId: id,
          userId,
        },
      },
    });
  }

  getAllTags() {
    return this.prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        color: true,
        description: true,
        _count: {
          select: {
            users: true,
          },
        },
      },
    });
  }

  getById(id: number) {
    return this.prisma.tag.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  getTagsByUser(userId: number) {
    return this.prisma.tag.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });
  }

  getUsersByTag(tagId: number) {
    return this.prisma.user.findMany({
      where: {
        tags: {
          some: {
            tagId,
          },
        },
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    });
  }
}
