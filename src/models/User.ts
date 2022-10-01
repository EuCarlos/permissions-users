import Role from '@models/Role';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    username: string

    @Column()
    password: string

    @CreateDateColumn()
    created_at: string

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'users_roles',
        joinColumns: [{ name: 'user_id' }],
        inverseJoinColumns: [{ name: 'role_id' }]
    })
    roles: Role[]
}

export default User
