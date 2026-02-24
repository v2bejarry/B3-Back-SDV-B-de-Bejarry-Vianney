import { UserCredentialsEntity } from "./user.credentials.entity"

export const USER_REPOSITORY = Symbol('USER_REPOSITORY')

export interface IUserRepository {
    findUserByEmail(email: string): Promise<UserCredentialsEntity | null>
    findAll(): Promise<UserCredentialsEntity[]>
    createUser(user: UserCredentialsEntity): Promise<UserCredentialsEntity>
    updatePassword(email: string, newPasswordHash: string): Promise<UserCredentialsEntity | null>
    deleteUser(email: string): Promise<boolean>
}