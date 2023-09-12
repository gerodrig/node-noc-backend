
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
    critical = 'critical',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    timestamp?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public timestamp: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const {message, level, origin, timestamp = new Date()} = options;
        this.level = level;
        this.message = message;
        this.timestamp = timestamp;
        this.origin = origin;
    }

    static fromJson(json: string = ''): LogEntity {
        json = (json === '') ? '{}' : json;
        const {message, level, timestamp, origin } = JSON.parse(json);
        const log = new LogEntity({
            message,
            level,
            timestamp: new Date(timestamp),
            origin,
        });

        return log;
    }

    static fromObject = (object: {[key: string]: any}): LogEntity => {
        const {message, level, timestamp, origin } = object;

        //?We can define validations here

        return new LogEntity({
            message,
            level,
            timestamp,
            origin,
        });
    };
}