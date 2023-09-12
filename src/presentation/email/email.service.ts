import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogSeverityLevel, LogEntity } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor( ){}

    async sendEmail(options: SendMailOptions): Promise<boolean>{

        const {to, subject, htmlBody, attachments = []} = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });

            return true;
        } catch (error) {

            return false;
        }

    }

    async sendEmailWithFilesystemLogs(to: string | string[]){
        const subject = 'Server logs';
        const htmlBody = `
            <h1>Server logs</h1>
            <p>Attached to this email you will find the logs of the server</p>
            `;

        const attachments: Attachment[] = [
            {filename: 'logs-low.log', path: './logs/logs-low.log'},
        ];

        return this.sendEmail({to, subject, htmlBody, attachments});
    }
}