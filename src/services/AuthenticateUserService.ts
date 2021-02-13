import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    // verificando se o email existe
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/ password combination.');
    }

    // se o email existir segue as verificações

    // user.password -> senha criptografada
    // password -> senha não criptografada
    // metodo compare -> compara senha inserida com a senha criptografada no bd
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/ password combination.');
    }

    // User autenticado
    return {
      user,
    };
  }
}

export default AuthenticateUserService;
