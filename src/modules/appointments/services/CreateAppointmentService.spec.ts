import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '123456789',
    });

    expect(appointment.providerId).toBe('123456789');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2021, 0, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      providerId: '123456789',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
