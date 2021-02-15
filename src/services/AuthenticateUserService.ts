import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    // verificando se o email existe
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/ password combination.', 401);
    }

    // se o email existir segue as verificações

    // user.password -> senha criptografada
    // password -> senha não criptografada
    // metodo compare -> compara senha inserida com a senha criptografada no bd
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/ password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    // User autenticado
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
