import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from '../../../src/presentation/email/email.service';


describe('EmailService', () => {

    const mockSendEmail = jest.fn();

    //Mock createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendEmail,
    });

    const emailService = new EmailService();

    test('should send Email', async () => { 
        const options: SendMailOptions  = {
            to: 'benito@test.com',
            subject: 'test',
            htmlBody: '<h1>test</h1>',
        }

        await emailService.sendEmail(options);

        expect(mockSendEmail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: '<h1>test</h1>',
            subject: 'test',
            to: 'benito@test.com',
        });
     });

    test('should send Email with attachmetns', async () => {

        const email = 'benito@test.com';
        await emailService.sendEmailWithFilesystemLogs(email);

        console.log(mockSendEmail);

        expect(mockSendEmail).toHaveBeenCalledWith({
            html: expect.any(String),
            subject: expect.any(String),
            to: email,
            attachments: expect.any(Array),
        });

    });
});