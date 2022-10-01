import Permission from '@models/Permission';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";

@Entity('roles')
class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    describe: string

    @CreateDateColumn()
    created_at: string

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'permissions_roles',
        joinColumns: [{ name: 'role_id' }],
        inverseJoinColumns: [{ name: 'permission_id' }]
    })
    permission: Permission[]
}

export default Role
