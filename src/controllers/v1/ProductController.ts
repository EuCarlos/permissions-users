import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import ProductRepository from 'src/repositories/ProductRepository'
import { JsonResponse } from "src/concerns/response"

class ProductController {
  async create(req: Request, res: Response) {
    const productRepository = getCustomRepository(ProductRepository)

    const { name, description } = req.body

    const existsProduct = await productRepository.findOne({ name })

    if (existsProduct) {
        const result = new JsonResponse('Product already exists!', false)
        return res.status(400).json(result)
    }

    const product = productRepository.create({
      name,
      description,
    })

    await productRepository.save(product)

    const result = new JsonResponse('Product created successfully!', true, product)
    return res.status(201).json(result)
  }

  async index(req: Request, res: Response) {
    const productRepository = getCustomRepository(ProductRepository)

    const products = await productRepository.find()

    if(!products) {
        const result = new JsonResponse('Successful operation!', true)
        return res.json(result)
    }

    const result = new JsonResponse('Successful operation!', true, products)
    return res.json(result)
  }

  async show(req: Request, res: Response) {
    const productRepository = getCustomRepository(ProductRepository)

    const { id } = req.params

    const product = await productRepository.findOne(id)

    if(!product) {
        const result = new JsonResponse('Successful operation!', true)
        return res.json(result)
    }

    const result = new JsonResponse('Successful operation!', true, product)
    return res.json(result)
  }
}

export default new ProductController()
