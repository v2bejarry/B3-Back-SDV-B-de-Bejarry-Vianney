import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH_REPOSITORY } from './auth.repository.interface';
import type { IAuthRepository } from './auth.repository.interface';
import { DomainError } from 'src/errors/domain-errors';
import { EVENT_BUS } from '../core/events/event-bus.port';
import type { EventBusPort } from '../core/events/event-bus.port';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepo: IAuthRepository,
    @Inject(EVENT_BUS) private readonly eventBus: EventBusPort,
  ) {}

  async loginUserCase(){}
  private readonly user = {
    email: 'test@test.com',
    username: 'john',
    password: '123456',
  };

  login(email: string, username: string, password: string) {
    const isValid =
      email === this.user.email &&
      username === this.user.username &&
      password === this.user.password;

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      email,
      username,
      password
    };
  
  //throw new Error('')
  throw new DomainError({code : 'USER_NOT_FOUND',statusCode: 400, message: 'User not found', fields: { slug: [''] }, details: { reason: 'User does not exist' }})
  //throw new playerNotFoundError()
  {
    fields: {email: ['email not found']
    details : {email:['email not found']}
    }
  }
  }
}
