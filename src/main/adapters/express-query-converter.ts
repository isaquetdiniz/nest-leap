// @ts-nocheck

const booleanConverter = (value: string) => {
  if (value === 'true') return true;
  if (value === 'false') return false;

  return value;
};

const arrayConverter = (value: string) => {
  if (typeof value === 'string' && value !== '') return [...value.split(',')];
  return value;
};

const numberConverter = (value: string) => parseInt(value);

const propertysInQueryToConvert = {
  enabled: booleanConverter,
  confidential: booleanConverter,
  isFromBot: booleanConverter,
  roles: arrayConverter,
  areasIds: arrayConverter,
  requesterStatusIds: arrayConverter,
  regionsIds: arrayConverter,
  typesIds: arrayConverter,
  typesOperatorsIds: arrayConverter,
  channelsIds: arrayConverter,
  status: arrayConverter,
  take: numberConverter,
  skip: numberConverter,
  numberOfBlocks: numberConverter,
  numberOfApartments: numberConverter,
  types: arrayConverter,
  sendersRoles: arrayConverter,
  isOnline: booleanConverter,
  rangeDate: arrayConverter,
  emails: arrayConverter,
  periods: arrayConverter,
  usersIds: arrayConverter,
  createdAt: arrayConverter,
  ownersIds: arrayConverter,
  motivesIds: arrayConverter,
  requestersIds: arrayConverter,
  exportCsv: booleanConverter,
};

export const convertProperties = (obj: any): any =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (propertysInQueryToConvert[key])
        return [key, propertysInQueryToConvert[key](value)];
      return [key, value];
    })
  );
