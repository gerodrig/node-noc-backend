import { LogModel } from '../../data/mongo/models/log.model';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogDataSource } from '../../domain/datasources/log.datasource';


export class MongoLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    // await newLog.save();
    console.log('Mongo Log created: ', newLog);
  }
  async getLogs(securityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: securityLevel });

    return logs.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
}
