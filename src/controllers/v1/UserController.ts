import { JsonResponse } from './../../concerns/response';
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import UserRepository from 'src/repositories/UserRepository'

class UserController {
    async create(req: Request, res: Response) {
        const userRepository = getCustomRepository(UserRepository)

        const { name, username, password, } = req.body

        const existUser = await userRepository.findOne({ username })

        if(existUser) {
            const result = new JsonResponse('User already exists!', false)
            return res.status(400).json(result)
        }

        const user = userRepository.create({
            name,
            username,
            password
        })

        await userRepository.save(user)

        const result = new JsonResponse('User created', true, user)
        return res.status(201).json(result)
    }
}

export default new UserController
