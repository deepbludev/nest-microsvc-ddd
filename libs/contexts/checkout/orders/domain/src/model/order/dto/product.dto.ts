import { IsNumber, IsPositive, IsUUID } from 'class-validator'

export class ProductDTO {
  @IsUUID()
  id: string

  @IsNumber()
  @IsPositive()
  quantity: number

  @IsNumber()
  @IsPositive()
  cost: number
}
