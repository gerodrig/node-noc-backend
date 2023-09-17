import fs from 'fs';
import path from "path";
import { FileSystemDataSource } from '../../../src/infrastructure/datasources/file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('FileSystemDatasource', () => { 

    const logPath = path.join(__dirname, '../../../logs/');

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });

    test('should create log files if they do not exist', () => { 

        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual([ 'logs-critical.log', 'logs-high.log', 'logs-low.log', 'logs-medium.log' ]);
     });

     test('should save a log in logs-low.log', () => { 

        const LogDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test message',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts',
        });

        LogDatasource.saveLog(log);
        const allLogs = fs.readFileSync(logPath + 'logs-low.log', 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
      });

      test('should save a log in logs-medium.log', () => {

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test message',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts',
        });

        logDatasource.saveLog(log);
        const mediumLogs = fs.readFileSync(logPath + 'logs-medium.log', 'utf-8');
        expect(mediumLogs).toContain(JSON.stringify(log));
      });

      test('should save a log in logs-high.log', () => {

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test message',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts',
        });

        logDatasource.saveLog(log);
        const mediumLogs = fs.readFileSync(logPath + 'logs-high.log', 'utf-8');
        expect(mediumLogs).toContain(JSON.stringify(log));
      });

      test('should save a log in logs-critical.log', () => {

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test message',
            level: LogSeverityLevel.critical,
            origin: 'file-system.datasource.test.ts',
        });

        logDatasource.saveLog(log);
        const mediumLogs = fs.readFileSync(logPath + 'logs-critical.log', 'utf-8');
        expect(mediumLogs).toContain(JSON.stringify(log));
      });

      test('should return all logs', async () => { 
         
        const logDatasource = new FileSystemDataSource();
        const logLow = new LogEntity({
            message: 'log-low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts',
        });
        const logMedium = new LogEntity({
            message: 'log-medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts',
        });
        const logHigh = new LogEntity({
            message: 'log-high',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts',
        });
        const logCritical = new LogEntity({
            message: 'log-critical',
            level: LogSeverityLevel.critical,
            origin: 'file-system.datasource.test.ts',
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);
        await logDatasource.saveLog(logCritical);

        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);
        const logsCritical = await logDatasource.getLogs(LogSeverityLevel.critical);

        // console.log(logsLow);

        expect(logsLow).toEqual(expect.arrayContaining([logLow]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
        expect(logsCritical).toEqual(expect.arrayContaining([logCritical]));

       });

       test('should throw not throw an error if path exists', () => {

        new FileSystemDataSource();
        new FileSystemDataSource();

        expect(true).toBeTruthy();
       });

       test('should throw an error if severity level is not defined', async () => { 

            const logDatasource = new FileSystemDataSource();
            const customSeverityLevel = 'custom' as LogSeverityLevel;

            try {
                await logDatasource.getLogs(customSeverityLevel);
                expect(true).toBeFalsy();
            } catch (error) {
                const errorString = `${error}`;

                expect(errorString).toContain(customSeverityLevel);
            }
       });
 });