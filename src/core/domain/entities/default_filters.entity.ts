import { AutoValidator } from '@/libs/class-validator';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export enum OrderByMode {
  ASC = 'asc',
  DESC = 'desc',
}

export interface DefaultFilters {
  take?: number;
  skip?: number;
  orderByProperty?: string;
  orderByMode?: OrderByMode;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;
}

export interface TPaginationResponse<T> {
  data: T[];
  totalItemsListed: number;
  totalItems: number;
}

export class DefaultFiltersEntity implements DefaultFilters {
  take: number;
  skip: number;
  orderByProperty?: string;
  orderByMode?: OrderByMode;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;

  constructor(props: DefaultFilters) {
    this.take = props.take ?? 10;
    this.skip = props.skip ?? 0;

    this.orderByProperty = props.orderByProperty ?? 'createdAt';
    this.orderByMode = props.orderByMode ?? OrderByMode.ASC;

    this.createdAtStart = props.createdAtStart;
    this.createdAtEnd = props.createdAtEnd;
    this.updatedAtStart = props.updatedAtStart;
    this.updatedAtEnd = props.updatedAtEnd;
  }
}

export class DefaultFiltersRequest
  extends AutoValidator
  implements DefaultFilters
{
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  take?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  orderByProperty?: string;

  @IsOptional()
  @IsEnum(OrderByMode)
  orderByMode?: OrderByMode;

  @IsOptional()
  @IsDate()
  createdAtStart?: Date;

  @IsOptional()
  @IsDate()
  createdAtEnd?: Date;

  @IsOptional()
  @IsDate()
  updatedAtStart?: Date;

  @IsOptional()
  @IsDate()
  updatedAtEnd?: Date;

  constructor(props: DefaultFilters) {
    super(props);
    Object.assign(this, props);
  }
}

export class PaginationResponse<T>
  extends AutoValidator
  implements TPaginationResponse<T>
{
  @IsArray()
  data: T[];

  @IsInt()
  @Max(100)
  @Min(0)
  totalItemsListed: number;

  @IsInt()
  @Min(0)
  totalItems: number;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }
}
