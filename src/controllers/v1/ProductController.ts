import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import ProductRepository from 'src/repositories/ProductRepository'
import result from "src/concerns/response"

class ProductController {
  async create(req: Request, res: Response) {
    const productRepository = getCustomRepository(ProductRepository)

    const { name, description } = req.body

    const existsProduct = await productRepository.findOne({ name })

    if (existsProduct) {
        return res.status(400).json(result.response('Product already exists!', false))
    }

    const product = productRepository.create({
      name,
      description,
    })

    await productRepository.save(product)

    return res.status(201).json(result.response('Product created successfully!', true, product))
  }

  async index(req: Request, res: Response) {
    const productRepository = getCustomRepository(ProductRepository)

    const products = await productRepository.find()

    if(!products) return res.json(result.response('Successful operation!', true))

    return res.json(result.response('Successful operation!', true, products))
  }

  async show(req: Request, res: Response) {
    const productRepository = getCustomRepository(ProductRepository)

    const { id } = req.params

    const product = await productRepository.findOne(id)

    if(!product) return res.json(result.response('Successful operation!', true))

    return res.json(result.response('Successful operation!', true, product))
  }
}

export default new ProductController()
