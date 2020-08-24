// Rota de Autenticacao

import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);
  // Recebendo de services
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  // Enviando ao client Auth User
  return response.json({ user, token });
});

export default sessionsRouter;
