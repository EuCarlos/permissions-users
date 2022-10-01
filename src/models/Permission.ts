import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('permissions')
class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    describe: string

    @CreateDateColumn()
    created_at: string
}

export default Permission
