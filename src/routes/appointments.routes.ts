import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

/* A Rota deve se preocupar com uma unica funcao:

1) Tudo que eh transformacao de dados fica nas rotas
2) Rota  => Receber a requisicao, chamar outro arquivo para tratar a requisicao e devolver uma resposta
2.1) Recebo os dados de uma forma e quero transformar ele em outra
3) Quando for algo alem disso devemos abstrair isso dentro de um './services'
*/

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
