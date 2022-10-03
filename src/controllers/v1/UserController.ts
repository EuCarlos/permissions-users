import result from './../../concerns/response'
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

        if(existUser) return res.status(400).json(result.response('User already exists!', false))

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

        return res.status(201).json(result.response('User created', true, user))
    }
}

export default new UserController
