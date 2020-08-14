import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ResetForgotService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetForgotService);
  
    await resetPassword.execute({
      password,
      token
    });
  
    return response.status(204).json();
  } 
}