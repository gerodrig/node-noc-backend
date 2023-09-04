import { CronService } from '@/presentation/cron/cron-service';
import { CheckService } from '@/domain/use-cases/checks/check-service';

export class Server {
  public static start() {
    console.log('Server is running...');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';

        new CheckService(
          () => console.log(`${url} is ok`),
          (error) => console.error(error),
        ).execute(url);
        // new CheckService().execute('http://localhost:3004');
      },
    );
  }
}
