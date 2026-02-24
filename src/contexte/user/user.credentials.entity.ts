import {Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn} from "typeorm"

@Entity('user')
export class UserCredentialsEntity{
    @PrimaryGeneratedColumn('uuid')//clÃ© unique
    id: string;
    
    @Column({name: 'password_h', type:"varchar", length:255})//colonne normal
    passwordHash:string;

    @Index({unique:true})// colonne unique
    @Column({name: 'email', type:"varchar", length:255})
    email:string;

        @Column({
            name: 'permissions',
            type: 'bigint',
            default: '0',
            transformer: {
                to: (value: bigint) => value.toString(),
                from: (value: string) => BigInt(value ?? '0'),
            },
        })
        permissions: bigint;

    @CreateDateColumn({name:'created_at'})//colonne automatique
    createdAt:Date;
}