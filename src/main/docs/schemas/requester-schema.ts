export const requesterSchema = {
  type: 'object',
  properties: {
    sei: {
      type: 'string',
      format: 'uuid',
    },
    typeId: {
      type: 'string',
      format: 'uuid',
    },
    requesterStatusId: {
      type: 'string',
      format: 'uuid',
    },
    regionId: {
      type: 'string',
      format: 'uuid',
    },
    areaId: {
      type: 'string',
      format: 'uuid',
    },
    name: {
      type: 'string',
    },
    cpf: {
      type: 'string',
    },
    rg: {
      type: 'string',
      required: false,
    },
    email: {
      type: 'string',
      required: false,
    },
    phone: {
      type: 'string',
      required: true,
    },
    phoneWhatsapp: {
      type: 'string',
      required: false,
    },
    observation: {
      type: 'string',
      required: false,
    },
    contactName: {
      type: 'string',
      required: false,
    },
    contactPhone: {
      type: 'string',
      required: false,
    },
    relativeName: {
      type: 'string',
      required: false,
    },
    relativeCpf: {
      type: 'string',
      required: false,
    },
    relativeRg: {
      type: 'string',
      required: false,
    },
    relativeObservation: {
      type: 'string',
      required: false,
    },
    relativePhone: {
      type: 'string',
      required: false,
    },
    relativeAddress: {
      type: 'string',
      required: false,
    },
    stamp: {
      type: 'string',
      required: false,
    },
    batch: {
      type: 'string',
      required: false,
    },
    sector: {
      type: 'string',
      required: false,
    },
    address: {
      type: 'string',
      required: false,
    },
  },
};

export const updateRequesterSchema = {
  type: 'object',
  properties: {
    sei: {
      type: 'string',
      required: false,
    },
    typeId: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    requesterStatusId: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    regionId: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    areaId: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    name: {
      type: 'string',
      required: false,
    },
    cpf: {
      type: 'string',
      required: false,
    },
    rg: {
      type: 'string',
      required: false,
    },
    email: {
      type: 'string',
      required: false,
    },
    phone: {
      type: 'string',
      required: false,
    },
    phoneWhatsapp: {
      type: 'string',
      required: false,
    },
    observation: {
      type: 'string',
      required: false,
    },
    contactName: {
      type: 'string',
      required: false,
    },
    contactPhone: {
      type: 'string',
      required: false,
    },
    relativeName: {
      type: 'string',
      required: false,
    },
    relativeCpf: {
      type: 'string',
      required: false,
    },
    relativeRg: {
      type: 'string',
      required: false,
    },
    relativeObservation: {
      type: 'string',
      required: false,
    },
    relativePhone: {
      type: 'string',
      required: false,
    },
    relativeAddress: {
      type: 'string',
      required: false,
    },
    stamp: {
      type: 'string',
      required: false,
    },
    batch: {
      type: 'string',
      required: false,
    },
    sector: {
      type: 'string',
      required: false,
    },
    address: {
      type: 'string',
      required: false,
    },
  },
};
