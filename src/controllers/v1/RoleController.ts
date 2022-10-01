import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express";
import RoleRepository from 'src/repositories/RoleRepository';
import PermissionRepository from 'src/repositories/PermissionRepository';
import { JsonResponse } from 'src/concerns/response';


class RoleController {
    async create(req: Request, res: Response) {
        const roleRepository = getCustomRepository(RoleRepository)
        const permissionRepository = getCustomRepository(PermissionRepository)

        const { name, describe, permissions } = req.body

        const existRole = await roleRepository.findOne({ name })

        if (existRole) {
            const result = new JsonResponse('Role already exists!', false)
            return res.status(400).json(result)
        }

        const existPermissions = await permissionRepository.findByIds(permissions)

        const role = roleRepository.create({
            name,
            describe,
            permission: existPermissions
        })

        await roleRepository.save(role)

        const result = new JsonResponse('Role created!', true, role)
        return res.status(201).json(result)
    }
}

export default new RoleController
