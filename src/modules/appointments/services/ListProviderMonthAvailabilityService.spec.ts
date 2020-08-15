import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository;
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the month availability from providers', async () => {
    for (let i = 8; i < 19; i++) {
      await fakeAppointmentsRepository.create({
        providerId: 'user',
        userId: 'user2',
        date: new Date(2020, 3, 20, i, 0, 0),
      });
    }
    
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user2',
      date: new Date(2020, 3, 21, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      providerId: 'user',
      year: 2020,
      month: 4
    });
    
    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 16, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ])
    );
  });
});