export const documentSchema = {
  type: 'object',
  properties: {
    typeId: {
      type: 'string',
      format: 'uuid',
      required: true,
    },
    status: {
      type: 'string',
      enum: ['approved', 'pending', 'disapproved'],
    },
    documentImage: {
      type: 'string',
      format: 'binary',
      required: true,
    },
    observation: {
      type: 'string',
    },
    requesterId: {
      type: 'string',
      format: 'uuid',
      required: true,
    },
  },
};

export const updateDocumentSchema = {
  type: 'object',
  properties: {
    typeId: {
      type: 'string',
      format: 'uuid',
    },
    status: {
      type: 'string',
      enum: ['approved', 'pending', 'disapproved'],
    },
    documentImage: {
      type: 'string',
      format: 'binary',
    },
    observation: {
      type: 'string',
    },
    requesterId: {
      type: 'string',
      format: 'uuid',
    },
  },
};
