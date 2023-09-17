import { CronService } from '../../../src/presentation/cron/cron-service';

describe('CronService', () => {
  const mockTick = jest.fn();

  test('should create a job', (done) => {
    const job = CronService.createJob('* * * * * *', mockTick);

    setTimeout(() => {
      expect(mockTick).toBeCalledTimes(2);
      job.stop();
      done();
    }, 2000);
  });
});
