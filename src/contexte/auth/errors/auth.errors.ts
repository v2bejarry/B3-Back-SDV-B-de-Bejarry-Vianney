import { DomainError } from "src/errors/domain-errors";

export class UserNotFoundError extends DomainError {
    public readonly fields: Record<string, string[]>;
    constructor(
        params: {
            fields:Record<string, string[]>;
        }
    ) {
        super({
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            statusCode: 400,
            fields: { slug: [''] },
            details: { reason: 'User does not exist' }
        });
        this.fields = params.fields;
    }
}