import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { SendEmailLogs } from '../../../../src/domain/use-cases/emails/send-email-logs';
import { LogEntity } from '../../../../src/domain/entities/log.entity';


describe('SendEmailLogs', () => {

    const mockEmailService = {
        sendEmailWithFilesystemLogs: jest.fn().mockReturnValue(true),
    };

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call sendEmail and saveLogs', async () => { 

        const userEmail = 'benito@test.com';
        const result = await sendEmailLogs.execute(userEmail);


        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFilesystemLogs).toBeCalledTimes(1);
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toBeCalledWith({
            timestamp: expect.any(Date),
            level: 'low',
            message: `Log Email sent to ${userEmail}`,
            origin: 'send-email-logs.ts'
        });
    });

    test('should log in case of error', async () => {

        mockEmailService.sendEmailWithFilesystemLogs.mockReturnValue(false);

        const userEmail = 'benito@test.com';
        const result = await sendEmailLogs.execute(userEmail);

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFilesystemLogs).toBeCalledTimes(1);
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toBeCalledWith({
            timestamp: expect.any(Date),
            level: 'low',
            message: 'Error: Email was not sent',
            origin: 'send-email-logs.ts'
        });
    });
})