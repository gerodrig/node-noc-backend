import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class FileSystemDataSource implements LogDataSource {

private readonly logPath = 'logs/';
private readonly allLogsPath = 'logs/logs-low.log';
private readonly mediumLogsPath = 'logs/logs-medium.log';
private readonly highLogsPath = 'logs/logs-high.log';
private readonly criticalLogsPath = 'logs/logs-critical.log';

constructor() {
    this.createLogsFiles();
}

private createLogsFiles = () => {

    if(!fs.existsSync(this.logPath)){
        fs.mkdirSync(this.logPath);
    }

    [
        this.allLogsPath,
        this.mediumLogsPath,
        this.highLogsPath,
        this.criticalLogsPath,
    ].forEach((path) => {
        if(fs.existsSync(path)) return;

        fs.writeFileSync(path, '');
    });

};

async saveLog(newLog: LogEntity): Promise<void> {
    //add the log based on the severity level
    const logAsJson = JSON.stringify(newLog);
    fs.appendFileSync(this.allLogsPath, logAsJson);

    if( newLog.level === LogSeverityLevel.low ) return;

    if( newLog.level === LogSeverityLevel.medium ) {
        fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else if( newLog.level === LogSeverityLevel.high ){
        fs.appendFileSync(this.highLogsPath, logAsJson);
    } else {
        fs.appendFileSync(this.criticalLogsPath, logAsJson);
    }
}

private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');

    if(content === '') return [];

    const logsAsJson = content.split('\n').map((log) => LogEntity.fromJson(log));

    return logsAsJson;
};

async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    switch(severityLevel){
        case LogSeverityLevel.low:
            return this.getLogsFromFile(this.allLogsPath);
        case LogSeverityLevel.medium:
            return this.getLogsFromFile(this.mediumLogsPath);
        case LogSeverityLevel.high:
            return this.getLogsFromFile(this.highLogsPath);
        case LogSeverityLevel.critical:
            return this.getLogsFromFile(this.criticalLogsPath);

            default: 
            throw new Error(`${severityLevel} is not implemented`);
    }
}
}