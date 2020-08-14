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
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 7, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 7, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 7, 21, 8, 0, 0),
    });

    const availability = listProviderMonthAvailability.execute({
      providerId: 'user',
      year: 2020,
      month: 8
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 16, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ])
    );
  });
});