import { uuid } from 'uuidv4';

/**
 * Representacao de como os dados sao salvo s dentro da nossa aplicacao
 * Responsavel pelo formato dos nossos dados
 */
class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
