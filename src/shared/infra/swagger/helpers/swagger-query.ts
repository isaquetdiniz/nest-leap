import { SwaggerTypes } from './swagger-types';

type queryParams = [property: string, type: any, options?: any][];

export class SwaggerQuery {
  static params(queryParams: queryParams) {
    return queryParams.map(([property, type, options = {}]) => ({
      in: 'query',
      name: property,
      schema: type,
      ...options,
    }));
  }
}

export const defaultFilterParams = SwaggerQuery.params([
  ['take', SwaggerTypes.integer()],
  ['skip', SwaggerTypes.integer()],
  [
    'createdAt',
    SwaggerTypes.array(false, SwaggerTypes.dateTime(), 2),
    { style: 'form', explode: false },
  ],
  [
    'updatedAt',
    SwaggerTypes.array(false, SwaggerTypes.dateTime(), 2),
    { style: 'form', explode: false },
  ],
  [
    'orderBy',
    SwaggerTypes.array(false, SwaggerTypes.string(), 2),
    { style: 'form', explode: false },
  ],
  ['count', SwaggerTypes.boolean()],
]);
