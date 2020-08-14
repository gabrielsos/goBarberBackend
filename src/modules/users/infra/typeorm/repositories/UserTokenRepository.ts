import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserTokens from '@modules/users/infra/typeorm/entities/UserTokens';

export default class UserTokenRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const user_token = await this.ormRepository.findOne({
      where: { token }
    });
    return user_token;
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const user_token = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(user_token);

    return user_token;
  }
}
