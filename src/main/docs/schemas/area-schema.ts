export const areaSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: ['area', 'enterprise'],
    },
    regionId: {
      type: 'string',
      format: 'uuid',
    },
    lat: {
      type: 'string',
    },
    lng: {
      type: 'string',
      format: 'uuid',
    },
    address: {
      type: 'string',
      required: 'false',
    },
    numberOfBlocks: {
      type: 'integer',
      required: 'false',
    },
    numberOfApartments: {
      type: 'integer',
      required: 'false',
    },
  },
};

export const updateAreaSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: false,
    },
    type: {
      type: 'string',
      enum: ['area', 'enterprise'],
      required: false,
    },
    enabled: {
      type: 'boolean',
      required: false,
    },
    regionId: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    lat: {
      type: 'string',
      required: false,
    },
    lng: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    address: {
      type: 'string',
      required: 'false',
    },
    numberOfBlocks: {
      type: 'integer',
      required: 'false',
    },
    numberOfApartments: {
      type: 'integer',
      required: 'false',
    },
  },
};
