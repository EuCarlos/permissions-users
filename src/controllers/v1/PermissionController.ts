import { getCustomRepository } from 'typeorm'
import { Request, Response } from "express"
import PermissionRepository from 'src/repositories/PermissionRepository'
import result from 'src/concerns/response'


class PermissionController {
    async create(req: Request, res: Response) {
        const permissionRepository = getCustomRepository(PermissionRepository)

        const { name, describe } = req.body

        const existPermission = await permissionRepository.findOne({ name })

        if (existPermission) return res.status(400).json(result.response('Permission already exists!', false))

        const permission = permissionRepository.create({ name, describe })

        await permissionRepository.save(permission)

        return res.status(201).json(result.response('Permission created!', true, permission))
    }
}

export default new PermissionController
