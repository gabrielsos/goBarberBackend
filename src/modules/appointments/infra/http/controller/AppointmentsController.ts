import { Request, Response } from 'express';

import { parseISO } from 'date-fns';

import { container } from 'tsyringe';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { providerId, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentsService);
  
    const appointment = await createAppointment.execute({
      date,
      providerId,
      userId,
    });
  
    return response.json(appointment);
  }
}