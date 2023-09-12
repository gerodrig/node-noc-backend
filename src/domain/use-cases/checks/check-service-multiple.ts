import { LogRepository } from '../../repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';


interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        // IDEA: Use dependency injection
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) {}

    private callLogs( log: LogEntity ) {
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog(log);
        })
    }

    async execute(url: string): Promise<boolean> {

        const options = {
            message: `Service ${url} is working`,
            level: LogSeverityLevel.low,
            origin: 'check-service.ts',
        };

        try {
            const request = await fetch(url);
            if(!request.ok) throw new Error(`Error on check service ${url}`);

            const log = new LogEntity(options);
            this.callLogs(log);
            this.successCallback && this.successCallback();
            return true
        } catch (error) {
            // console.error(`${error}`);
            options.message = `${url} id not ok. ${error}`
            const log = new LogEntity(options);
            this.callLogs(log);

            this.errorCallback && this.errorCallback(options.message);
            return false
        }

    }
}