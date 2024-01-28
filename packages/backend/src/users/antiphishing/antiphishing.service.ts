import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '@prisma/prisma.service';
import { Base, CodeGenerator } from '@utils/code.generator';
import { DateTime } from 'luxon';

@Injectable()
export class AntiphishingService {
  constructor(private prisma: PrismaService) {}

  getByUserId(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        antiPhishingCode: true,
      },
    });
  }

  setCode(userId: number, code: string) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        antiPhishingCode: code,
        antiPhishingCodeExpiration: DateTime.now()
          .plus({ months: 6 })
          .toJSDate(),
      },
    });
  }

  newRandomCode() {
    return {
      antiPhishingCode: CodeGenerator.generate(6, Base.ALPHANUM),
      antiPhishingCodeExpiration: DateTime.now().plus({ months: 6 }).toJSDate(),
    };
  }

  resetAntiphishingCode(userId: number) {
    // TODO send notification about reset
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: this.newRandomCode(),
    });
  }

  @Cron('0 0 * * *')
  async cronResetAntiphishingCode() {
    const users = await this.prisma.user.findMany({
      where: {
        antiPhishingCodeExpiration: {
          lte: new Date(),
        },
      },
    });
    await Promise.all(
      users.map(async (user) => this.resetAntiphishingCode(user.id)),
    );
  }
}
