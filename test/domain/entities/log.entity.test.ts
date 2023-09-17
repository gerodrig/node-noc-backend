import { LogSeverityLevel, LogEntity } from '../../../src/domain/entities/log.entity';


describe('LogEntity log.entity.ts', () => {

    const dataObj = {
        message: 'test message',
        level: LogSeverityLevel.critical,
        origin: 'log.entity.test.ts',
    }

    test('should create a LogEntity instance', () => {
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.timestamp).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from JSON', () => {
        const json = `{"message":"Service https://google.com working","level":"low","origin":"checkservice.ts","timestamp":"2021-01-01T00:00:00.000Z"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Service https://google.com working');
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe('checkservice.ts');
        expect(log.timestamp).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from object', () => {

        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.timestamp).toBeInstanceOf(Date);
    });
})