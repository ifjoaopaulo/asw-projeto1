import { MailMessage } from "./MailMessage";

export interface MailResult {
  previewUrl?: string;
}

export interface IMailProvider {
  sendMail(mail: MailMessage): Promise<MailResult>;
}
