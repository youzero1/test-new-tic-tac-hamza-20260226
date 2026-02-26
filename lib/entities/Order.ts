import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Product } from "./Product"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.orders)
    user: User

    @ManyToOne(() => Product, product => product.orders)
    product: Product

    @Column()
    quantity: number

    @Column()
    createdAt: Date
}
