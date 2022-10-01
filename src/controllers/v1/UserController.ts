import { JsonResponse } from './../../concerns/response'
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import UserRepository from 'src/repositories/UserRepository'
import RoleRepository from 'src/repositories/RoleRepository'

class UserController {
    async create(req: Request, res: Response) {
        const userRepository = getCustomRepository(UserRepository)
        const roleRepository = getCustomRepository(RoleRepository)

        const { name, username, password, roles } = req.body

        const existUser = await userRepository.findOne({ username })

        if(existUser) {
            const result = new JsonResponse('User already exists!', false)
            return res.status(400).json(result)
        }

        const passwordHashed = await hash(password, 8)

        const existsRoles = await roleRepository.findByIds(roles)

        const user = userRepository.create({
            name,
            username,
            password: passwordHashed,
            roles: existsRoles
        })

        await userRepository.save(user)

        delete user.password

        const result = new JsonResponse('User created', true, user)
        return res.status(201).json(result)
    }
}

export default new UserController
