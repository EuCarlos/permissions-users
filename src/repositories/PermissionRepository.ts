import Permission from '@models/Permission';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Permission)
class PermissionRepository extends Repository<Permission> {}

export default PermissionRepository
