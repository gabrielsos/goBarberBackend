import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProvidersDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository;
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the day availability from providers', async () => {
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user2',
      date: new Date(2020, 7, 20, 14, 0, 0),
    });
    
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'user2',
      date: new Date(2020, 7, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 20, 11).getTime();

    });

    const availability = await listProviderDayAvailability.execute({
      providerId: 'user',
      day: 20,
      year: 2020,
      month: 8
    });
    
    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ])
    );
  });
});