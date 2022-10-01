import Role from '@models/Role';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Role)
class RoleRepository extends Repository<Role> {}

export default RoleRepository
