import { IsNumber, IsPositive } from 'class-validator'

export class ProductDTO {
  @IsNumber()
  @IsPositive()
  id: number

  @IsNumber()
  @IsPositive()
  quantity: number

  @IsNumber()
  @IsPositive()
  cost: number
}
