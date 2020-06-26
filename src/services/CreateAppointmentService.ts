import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ providerId, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    // Instancia o objeto criado porem nao salva no Database
    const appointment = appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    // Comando para salvar no Database

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
