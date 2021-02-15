/**
 * Regras de Negocio
 * Não pode cadastrar um usuario com email duplicado
 * A senha precisa ser criptografada antes de ir para o banco de dados
 */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // Verificando se já existe um MESMO email cadastrado
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    // se estiver duplicado retornara error
    if (checkUserExists) {
      throw new AppError('Email address already user.');
    }

    // caso passe pela verificação, a senha será criptografada com o hash do bcrypt
    const hashedPassword = await hash(password, 8);

    // create apenas cria uma instancia e nao salva no bd
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // salva na base
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
