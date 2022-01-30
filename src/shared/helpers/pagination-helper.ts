export interface PaginationDTO {
  take?: number;
  skip?: number;
}

export class Pagination {
  take: number;
  skip: number;

  constructor({ take, skip }: PaginationDTO) {
    this.take = take ?? 10;
    this.skip = skip ?? 0;
  }

  generateDTO() {
    return {
      take: this.take,
      skip: this.skip,
    };
  }
}
