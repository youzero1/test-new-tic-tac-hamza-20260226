import { NextApiRequest, NextApiResponse } from 'next'
import { AppDataSource } from '../../lib/data-source'
import { Product } from '../../lib/entities/Product'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await AppDataSource.initialize()
    const productRepository = AppDataSource.getRepository(Product)
    const products = await productRepository.find()
    res.status(200).json(products)
}
