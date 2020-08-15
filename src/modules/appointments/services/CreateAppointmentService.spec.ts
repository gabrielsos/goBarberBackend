import 'reflect-metadata';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCaseProvider';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 7, 10, 13),
      userId: '123123',
      providerId: '121321321'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('121321321');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 8, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      userId: '123123',
      providerId: '121321321'
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      userId: '123123',
      providerId: '121321321'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 7, 10, 11),
      userId: '123123',
      providerId: '121321321'
    })).rejects.toBeInstanceOf(AppError)
  });

    it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 7, 10, 13),
      userId: '123123',
      providerId: '123123'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment outside of business hour', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 7, 11, 7),
      userId: '123123',
      providerId: '1231234'
    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointment.execute({
      date: new Date(2020, 7, 11, 18),
      userId: '123123',
      providerId: '1231234'
    })).rejects.toBeInstanceOf(AppError)
  });
});