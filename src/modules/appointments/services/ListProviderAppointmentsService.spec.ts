import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCaseProvider';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProvidersDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository;
    fakeCacheProvider = new FakeCacheProvider;
    
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository, fakeCacheProvider
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 7, 20, 14, 0, 0),
    });
    
    const appointment2 = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 7, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      providerId: 'provider',
      day: 20,
      year: 2020,
      month: 8
    });
    
    expect(appointments).toEqual([
      appointment1,
      appointment2,
    ]);
  });
});