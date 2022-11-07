import { Type } from 'class-transformer'
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator'
import { ProductDTO } from './product.dto'

export class OrderDTO {
  @IsUUID()
  id: string

  @IsUUID()
  clientId: string

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
