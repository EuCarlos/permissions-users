import UserRepository from 'src/repositories/UserRepository';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm'
import result from 'src/concerns/response';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'

class SessionController {
    async create(req: Request, res: Response) {
        const { username, password } = req.body

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({ username })

        if(!user) {
            return res.status(400).json(result.response('User not found!', false))
        }

        const matchPassword = await compare(password, user.password)

        if(!matchPassword) {
            return res.status(403).json(result.response('Incorrect password or username!', false))
        }

        const token = sign({}, process.env.MD5_SESSION_SECRET_KEY, {
            subject: user.id,
            expiresIn: '1d'
        })

        return res.json(result.response('Session created!', true, { token, user }))
    }
}

export default new SessionController
