import { Inject, Injectable } from "@nestjs/common";
import { AUTH_USER_REGISTERED_EVENT } from "../events/user-registered.event";
import { OnEvent } from "@nestjs/event-emitter";
import { MAILER } from "../../mailer/mailer.port";
import type { MailerPort } from "../../mailer/mailer.port";

@Injectable()
export class SendUserRegisteredHandler {
    constructor(
        @Inject(MAILER) private readonly mailer: MailerPort,
    ) {}

    @OnEvent(AUTH_USER_REGISTERED_EVENT)
    async handle(payload: any) {
        const email = payload?.email as string | undefined;

        if (!email) {
            return;
        }

        await this.mailer.sendMail({    
            to: email,
            subject: 'Bienvenue sur Actu Project',
            text: 'Votre compte a bien été créé. Bienvenue !',
            html: `<p>Votre compte a bien été créé. Bienvenue !</p>`,
        });
    }
}