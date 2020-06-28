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

interface ResponseReturnUserAndTokenObject {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<ResponseReturnUserAndTokenObject> {
    // Buscar Usuarios
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // Bcrypt- Compare method return boolean
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // JWT - AuthConfig from ./config
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    // Usuario Autenticado
    // Promise:ResponseReturnUserAndTokenObject
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
