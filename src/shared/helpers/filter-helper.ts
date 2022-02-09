export type DateFilter = { initialDate?: Date; finalDate?: Date };

enum OrderByMode {
  ASC = 'asc',
  DESC = 'desc',
}

export interface OrderByFilterDTO {
  property?: string;
  mode?: OrderByMode;
}

export class OrderByFilter {
  property: string;
  mode: OrderByMode;

  constructor(orderByFilter: OrderByFilterDTO) {
    this.property = orderByFilter?.property ?? 'createdAt';
    this.mode = orderByFilter?.mode ?? OrderByMode.DESC;
  }

  generateDTO() {
    return {
      property: this.property,
      mode: this.mode,
    };
  }
}
