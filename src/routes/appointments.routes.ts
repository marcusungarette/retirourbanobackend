import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// Todas as rotas precisam de Authentication
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { providerId, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      providerId,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;

/* A Rota deve se preocupar com uma unica funcao:

1) Tudo que eh transformacao de dados fica nas rotas
2) Rota  => Receber a requisicao, chamar outro arquivo para tratar a requisicao e devolver uma resposta
2.1) Recebo os dados de uma forma e quero transformar ele em outra
3) Quando for algo alem disso devemos abstrair isso dentro de um './services'
*/
