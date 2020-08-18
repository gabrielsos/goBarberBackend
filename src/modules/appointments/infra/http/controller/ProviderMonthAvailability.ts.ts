import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;
    
    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    );
  
    const availability = await listProviderMonthAvailability.execute({
      providerId: provider_id,
      month: Number(month),
      year: Number(year),
    });
  
    return response.json({ availability });
  }
}