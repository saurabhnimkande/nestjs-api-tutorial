import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}
  @Get('me')
  async getMe(@GetUser() user: User) {
    const newUser = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        bookmarks: true,
      },
    });
    console.log(newUser);
    return user;
  }
}
