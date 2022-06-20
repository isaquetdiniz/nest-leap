import {
  IUpdateTestRepository,
  IGetTestsByFilterRepository,
  ISaveTestRepository,
  IDeleteTestByIdRepository,
} from '@/domains/test';
import { OrderByFilter, Pagination } from '@/shared/helpers';

export const mockCreateTestParams = (): ISaveTestRepository.Params => ({
  name: 'test name',
  enabled: true,
});

export const mockCreateTestResult = (): ISaveTestRepository.Result => ({
  id: 'a98a83d2-87f4-4a48-bfce-a80e27d7a7e2',
  name: 'test name',
  enabled: true,
  createdAt: new Date('2022-10-03'),
  updatedAt: new Date('2022-10-03'),
});

export const mockListTestParams = (): IGetTestsByFilterRepository.Params => ({
  filters: {
    name: 'test name',
    enabled: true,
    createdAt: { initialDate: new Date('2022-10-03') },
    updatedAt: { initialDate: new Date('2022-10-03') },
  },
  orderBy: new OrderByFilter({}),
  pagination: new Pagination({}),
});

export const mockUpdateTestParams = (): IUpdateTestRepository.Params => ({
  id: '9f0713c8-3a0e-425b-8522-09f5b96fe6c1',
  name: 'test name',
  enabled: true,
  createdAt: new Date('2022-10-03'),
  updatedAt: new Date('2022-10-03'),
});

export const mockDeleteTestByIdParams =
  (): IDeleteTestByIdRepository.Params => ('0643fac0-318d-4817-9fac-ba8309dcc78e');
