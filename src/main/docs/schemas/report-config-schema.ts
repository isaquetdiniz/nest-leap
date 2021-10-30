export const reportConfigSchema = {
  type: 'object',
  properties: {
    ownerId: {
      type: 'string',
      format: 'uuid',
    },
    emails: {
      type: 'array',
      items: {
        type: 'string',
      },
      required: true,
    },
    regionsIds: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid',
      },
      required: true,
    },
    period: {
      type: 'string',
      enum: ['daily', 'weekly', 'monthly'],
    },
    date: {
      type: 'string',
    },
  },
};

export const updateReportConfigSchema = {
  type: 'object',
  properties: {
    ownerId: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    emails: {
      type: 'array',
      items: {
        type: 'string',
      },
      required: true,
    },
    regionsIds: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid',
      },
      required: false,
    },
    period: {
      type: 'string',
      enum: ['daily', 'weekly', 'monthly'],
      required: false,
    },
    date: {
      type: 'string',
      required: false,
    },
  },
};
