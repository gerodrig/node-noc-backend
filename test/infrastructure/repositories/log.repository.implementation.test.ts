import { LogRepositoryImplementation } from '../../../src/infrastructure/repositories/log.repository.implementation';
import { LogEntity , LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('LogRepositoryImplementation', () => { 


    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const logRepository = new LogRepositoryImplementation(mockLogDataSource);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call the datasource with arguments using saveLogs', async () => {

        const log = { level: LogSeverityLevel.critical, message: 'hello'} as LogEntity;
        await logRepository.saveLog(log);

        expect( mockLogDataSource.saveLog ).toHaveBeenCalledWith(log);
    });

    test('should call the datasource with arguments using getLogs', async () => {

        const lowSeverity = LogSeverityLevel.low;
        await logRepository.getLogs(lowSeverity);

        expect( mockLogDataSource.getLogs ).toBeCalledWith(lowSeverity);
    });
 });