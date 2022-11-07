import { Type } from 'class-transformer'
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator'
import { ProductDTO } from './product.dto'

export class OrderDTO {
  @IsNumber()
  @IsPositive()
  id: number

  @IsNumber()
  @IsPositive()
  clientId: number

  @Type(() => Date)
  @IsDate()
  date: Date

  @IsString()
  @IsNotEmpty()
  address: string

  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  products: ProductDTO[]
}
