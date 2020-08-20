import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepositoty from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import { date } from '@hapi/joi';

class AppointmentsRepository implements IAppointmentsRepositoty {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date, providerId: String): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, providerId },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(dateFieldName => 
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth} - ${year}'`
        )
      }
    })

    return appointments;
  }

  public async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year
  }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(dateFieldName => 
          `to_char(${dateFieldName}, 'YYYY-MM-DD') = '${year}-${parsedMonth}-${parsedDay}'`
        )
      },
      order: {
        date: 'ASC',
      },
      relations: ['user']
    })

    return appointments;
  }

  public async create({ providerId, userId, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ providerId, date, userId })

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
