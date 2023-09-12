import { CronService } from '@/presentation/cron/cron-service';
import { CheckService } from '@/domain/use-cases/checks/check-service';
import { SendEmailLogs } from '@/domain/use-cases/emails/send-email-logs';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementation';
import { FileSystemDataSource } from '@/infrastructure/datasources/file-system.datasource';
import { EmailService } from './email/email.service';
import { MongoLogDataSource } from '@/infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '@/infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '@/domain/use-cases/checks/check-service-multiple';


const fsLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource(),
);
const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDataSource(),
);
const postgresLogRepository = new LogRepositoryImplementation(
  new PostgresLogDataSource(),
);

const emailService = new EmailService();


export class Server {
  public static start() {
    console.log('Server is running...');

    //? Send email

    //?Send email without attachments
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'garc@outlook.com'
    // ]);
    // emailService.sendEmail({
    //   to: 'garc@outlook.com',
    //   subject: 'Test',
    //   htmlBody: '<h1>Test</h1>',
    // });

    //? Send email with attachments
    // emailService.sendEmailWithFilesystemLogs([
    //   'garc@outlook.com',
    // ]);

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';

        new CheckServiceMultiple(
          [fsLogRepository, mongoLogRepository, postgresLogRepository],
          () => console.log(`${url} is ok`),
          (error) => console.error(error),
        ).execute(url);
        // new CheckService().execute('http://localhost:3004');
      },
    );
  }
}
