import { EmailService } from '../../../presentation/email/email.service';
import { LogRepository } from '../../repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';



interface SendLogEmailUseCase {
    execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {

constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
){}

async execute(to: string | string[]): Promise<boolean> {

    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Log Email sent to ${to}`,
        origin: 'send-email-logs.ts',
    });

    try {
        
        const sent = await this.emailService.sendEmailWithFilesystemLogs(to);

        if(!sent) throw new Error('Email was not sent');

        this.logRepository.saveLog(log);

        return true;

    } catch (error) {
        log.message = `${error}`;
        this.logRepository.saveLog(log);
        return false
        
    }

}

}