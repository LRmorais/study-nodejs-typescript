// adicionando novas tipagens dentro de Express
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
