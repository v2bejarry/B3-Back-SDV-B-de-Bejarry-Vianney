export const MAILER = Symbol('MAILER');

export interface MailerPort {
  sendMail(options: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
  }): Promise<void>;
}
export class mailerModule {}