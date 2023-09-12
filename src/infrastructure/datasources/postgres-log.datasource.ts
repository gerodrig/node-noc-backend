import { LogDataSource } from '@/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '@/domain/entities/log.entity';
import { PrismaClient, SeverityLevel} from '@prisma/client';

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
    critical: SeverityLevel.CRITICAL,
};

export class PostgresLogDataSource implements LogDataSource{
async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const newLog = await prismaClient.logModel.create({
        data: {
            ...log,
            level,
        }

});

}
async getLogs(securityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[securityLevel];

    const dbLogs = await prismaClient.logModel.findMany({
        where: { level },
    });
    
    return dbLogs.map((dbLog) => LogEntity.fromObject(dbLog));
}
}