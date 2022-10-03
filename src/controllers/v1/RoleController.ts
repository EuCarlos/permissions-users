import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express";
import RoleRepository from 'src/repositories/RoleRepository';
import PermissionRepository from 'src/repositories/PermissionRepository';
import result from 'src/concerns/response';


class RoleController {
    async create(req: Request, res: Response) {
        const roleRepository = getCustomRepository(RoleRepository)
        const permissionRepository = getCustomRepository(PermissionRepository)

        const { name, describe, permissions } = req.body

        const existRole = await roleRepository.findOne({ name })

        if (existRole) return res.status(400).json(result.response('Role already exists!', false))

        const existPermissions = await permissionRepository.findByIds(permissions)

        const role = roleRepository.create({
            name,
            describe,
            permission: existPermissions
        })

        await roleRepository.save(role)

        return res.status(201).json(result.response('Role created!', true, role))
    }
}

export default new RoleController
