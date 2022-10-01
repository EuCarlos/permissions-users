import UserRepository from 'src/repositories/UserRepository';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm'
import { JsonResponse } from 'src/concerns/response';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'

class SessionController {
    async create(req: Request, res: Response) {
        const { username, password } = req.body

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({ username })

        if(!user) {
            const result = new JsonResponse('User not found!', false)
            return res.status(400).json(result)
        }

        const matchPassword = await compare(password, user.password)

        if(!matchPassword) {
            const result = new JsonResponse('Incorrect password or username!', false)
            return res.status(403).json(result)
        }

        const token = sign({}, process.env.MD5_SESSION_SECRET_KEY, {
            subject: user.id,
            expiresIn: '1d'
        })

        const result = new JsonResponse('Session created!', true, { token, user })
        return res.json(result)
    }
}

export default new SessionController
