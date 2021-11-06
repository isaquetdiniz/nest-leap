export const createUserSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    isAdmin: {
      type: 'boolean',
      required: true,
    },
  },
};
