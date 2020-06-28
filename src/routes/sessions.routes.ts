// Rota de Autenticacao

import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    // Class execute promise from services
    const authenticateUser = new AuthenticateUserService();

    // Recebendo de services
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    // Enviando ao client Auth User
    return response.json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
