import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express";
import PermissionRepository from 'src/repositories/PermissionRepository';
import { JsonResponse } from 'src/concerns/response';


class PermissionController {
    async create(req: Request, res: Response) {
        const permissionRepository = getCustomRepository(PermissionRepository)

        const { name, describe } = req.body

        const existPermission = await permissionRepository.findOne({ name })

        if (existPermission) {
            const result = new JsonResponse('Permission already exists!', false)
            return res.status(400).json(result)
        }

        const permission = permissionRepository.create({ name, describe })

        await permissionRepository.save(permission)

        const result = new JsonResponse('Permission created!', true, permission)
        return res.status(201).json(result)
    }
}

export default new PermissionController
