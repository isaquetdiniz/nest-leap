export const userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    role: {
      type: 'string',
      enum: ['attendant', 'admin', 'technique', 'supervisor', 'coordinator'],
    },
    typeOperatorId: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    regionId: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    areasIds: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid',
      },
      required: false,
    },
    profileImage: {
      type: 'string',
      format: 'binary',
      required: false,
    },
  },
};

export const updateUserSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: false,
    },
    enabled: {
      type: 'boolean',
      required: false,
    },
    role: {
      type: 'string',
      enum: ['attendant', 'admin', 'technique', 'supervisor', 'coordinator'],
      required: false,
    },
    typeOperatorId: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    regionId: {
      type: 'string',
      format: 'uuid',
      required: false,
    },
    areasIds: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid',
      },
      required: false,
    },
    profileImage: {
      type: 'string',
      format: 'binary',
      required: false,
    },
    isToReceiveEmail: {
      type: 'boolean',
      required: false,
    },
    calendarUrl: {
      type: 'string',
      required: false,
    },
  },
};
