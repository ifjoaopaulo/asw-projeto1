import nodemailer from "nodemailer";
import logger from "../lib/logger";
import { getMailClient } from "../lib/mail";
import { MailMessage } from "./MailMessage";
import { IMailProvider, MailResult } from "./IMailProvider";

export class EtherealMailProvider implements IMailProvider {
  async sendMail(mail: MailMessage): Promise<MailResult> {
    const mailer = await getMailClient();

    const info = await mailer.sendMail({
      from: '"DevStore" <noreply@devstore.com>',
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });

    const url = nodemailer.getTestMessageUrl(info);
    logger.info(`Email enviado: ${url}`);

    return { previewUrl: url || undefined };
  }
}
