import { DataSource } from "typeorm"
import { Product } from "./entities/Product"
import { Order } from "./entities/Order"
import { User } from "./entities/User"
import { GameSession } from "./entities/GameSession"
import { GameMove } from "./entities/GameMove"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DATABASE_PATH || "./database.sqlite",
    entities: [Product, Order, User, GameSession, GameMove],
    synchronize: true,
    logging: false,
})

AppDataSource.initialize().catch((error) => console.log(error))
