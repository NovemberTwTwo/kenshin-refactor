import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import {
  getMyGenshinData,
  getMyGenshinNote,
  getUserGenshinCharacters,
  getUserGenshinProfile,
} from 'utils/fetch/fetchApi';
import getServer from 'utils/getServer';

@Injectable()
export class GenshinService {
  constructor(private userRepository: UserRepository) {}

  private myData: any = {};
  private avatars: any = [];

  async setCookie(user: User, mihoyoCookie: string): Promise<void> {
    const { id } = user;
    try {
      const data = await getMyGenshinData(mihoyoCookie);
      this.myData = { ...data };
      this.userRepository.update({ id }, { mihoyoCookie });
    } catch {
      throw new Error('Not Cookie');
    }
  }

  async getMyData(user: User) {
    try {
      const { id } = user;
      const mihoyoCookie = (await this.userRepository.findOneBy({ id }))
        .mihoyoCookie;
      const data = await getMyGenshinData(mihoyoCookie);
      this.myData = { ...data };
      return data;
    } catch {}
  }

  async getMyProfile(user: User) {
    try {
      if (this.myData.hasOwnProperty('game_role_id'))
        await this.getMyData(user);
      const data = await getUserGenshinProfile(
        this.myData.region,
        this.myData.game_role_id,
      );
      this.avatars = data.data.avatars;
      return data;
    } catch {}
  }

  async getMyNote(user: User) {
    try {
      if (this.myData.hasOwnProperty('game_role_id'))
        await this.getMyData(user);
      const data = await getMyGenshinNote(
        this.myData.region,
        this.myData.game_role_id,
      );
      return data;
    } catch {}
  }

  async getUserProfile(gameRoleId: string) {
    try {
      const data = await getUserGenshinProfile(
        getServer(gameRoleId),
        gameRoleId,
      );
      this.avatars = data.data.avatars;
      return data;
    } catch {}
  }

  async getUserCharacters(gameRoleId: string) {
    try {
      if (this.avatars.length === 0) await this.getUserProfile(gameRoleId);
      const data = await getUserGenshinCharacters(
        getServer(gameRoleId),
        gameRoleId,
        this.avatars,
      );
      return data;
    } catch {}
  }
}
