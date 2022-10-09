export type DateFilter = {
  initial: Date;
  final: Date;
};

export type OrderByFilter = {
  property: string;
  mode: string;
};

export interface DefaultFilters {
  take?: number;
  skip?: number;
  orderBy?: OrderByFilter;
  createdAt?: DateFilter;
  udpatedAt?: DateFilter;
}

export class DefaultFiltersEntity implements DefaultFilters {
  take: number;
  skip: number;
  orderBy?: OrderByFilter;
  createdAt?: DateFilter;
  updatedAt?: DateFilter;

  constructor(props: DefaultFilters) {
    this.take = props.take ?? 10;
    this.skip = props.skip ?? 0;

    this.orderBy = {
      ...(props.orderBy?.property
        ? { property: props.orderBy.property }
        : { property: 'createdAt' }),
      ...(props.orderBy?.mode ? { mode: props.orderBy.mode } : { mode: 'asc' }),
    };

    this.createdAt = props.createdAt;
    this.updatedAt = props.udpatedAt;
  }
}
