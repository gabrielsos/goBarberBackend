import { uuid } from 'uuidv4';
import { isEqual, getMonth, getDate, getYear } from 'date-fns';

import IAppointmentsRepositoty from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepositoty {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );
  
    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.providerId === providerId && 
        getMonth(appointment.date) + 1 === month && 
        getYear(appointment.date) === year 
      )
    });

    return appointments;
  }

  public async create({ providerId, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, providerId})

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;