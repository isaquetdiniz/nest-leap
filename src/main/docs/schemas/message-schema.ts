export const messageSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['text', 'media', 'audio', 'document'],
    },
    senderRole: {
      type: 'string',
      enum: ['user', 'requester'],
    },
    senderId: {
      type: 'string',
      format: 'uuid',
    },
    callId: {
      type: 'string',
      format: 'uuid',
    },
    requesterId: {
      type: 'string',
      format: 'uuid',
    },
    content: {
      type: 'string',
    },
  },
};

export const messageFileSchema = {
  type: 'object',
  properties: {
    ...messageSchema.properties,
    content: {
      type: 'string',
      format: 'binary',
      required: false,
    },
  },
};
