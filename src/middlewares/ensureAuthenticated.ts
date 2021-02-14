// middleware que irá verificar se o usuario está realmente autenticado
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token jwt
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }
  // Dividir o token em 2 partes(espaço em branco foi usado como parametro de separação)
  const [, token] = authHeader.split(' ');

  try {
    // verifica se o token enviado no cabeçalho está na mesma base do token gerado na aplicação
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    // incluindo o id do usuario nas proximas requisições após este middleware
    request.user = {
      id: sub,
    };
    // se está tudo correto a aplicação segue
    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
