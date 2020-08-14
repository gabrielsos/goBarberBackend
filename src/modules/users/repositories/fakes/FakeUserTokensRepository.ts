import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokens from '../../infra/typeorm/entities/UserTokens';

import { uuid } from 'uuidv4';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserTokens[] = [];

  public async generate(user_id: string): Promise<UserTokens> {

    const userTokens = new UserTokens();

    Object.assign(userTokens, {
      id: uuid(),
      token: uuid(),
      user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    this.userTokens.push(userTokens)

    return userTokens;
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userTokens = this.userTokens.find(findToken => findToken.token === token);

    return userTokens;
  }
}

export default FakeUserTokensRepository;
