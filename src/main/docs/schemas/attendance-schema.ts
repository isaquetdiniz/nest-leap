export const attendanceSchema = {
  type: 'object',
  properties: {
    isOnline: {
      type: 'boolean',
    },
    content: {
      type: 'string',
    },
    startDate: {
      type: 'string',
    },
    endDate: {
      type: 'string',
    },
    observation: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    requesterId: {
      type: 'string',
      format: 'uuid',
    },
    userId: {
      type: 'string',
      format: 'uuid',
    },
  },
};

const { properties } = attendanceSchema;
const { requesterId, ...restOfPropertiesWithouRequestId } = properties;

export const updateAttendanceSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: ['opened', 'concluded', 'canceled'],
    },
    ...restOfPropertiesWithouRequestId,
  },
};
