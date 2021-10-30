export const callSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: ['hold', 'opened', 'canceled', 'concluded'],
    },
    motiveId: {
      type: 'string',
      format: 'uuid',
      required: true,
    },
    channelId: {
      type: 'string',
      format: 'uuid',
      required: true,
    },
    requesterId: {
      type: 'string',
      format: 'uuid',
      required: true,
    },
    ownerId: {
      type: 'string',
      format: 'uuid',
    },
    observation: {
      type: 'string',
    },
    confidential: {
      type: 'boolean',
    },
    solvedAt: {
      type: 'string',
    },
  },
};

export const updateCallSchema = {
  type: 'object',
  properties: {
    ...callSchema.properties,
    usersIds: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
};
