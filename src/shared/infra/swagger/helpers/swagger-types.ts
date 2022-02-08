type required = boolean;

export class SwaggerTypes {
  static string(required: required = false) {
    return {
      type: 'string',
      required,
    };
  }

  static email(required: required = false) {
    return {
      type: 'string',
      format: 'email',
      required,
    };
  }

  static uuid(required: required = false) {
    return {
      type: 'string',
      format: 'uuid',
      required,
    };
  }

  static password(required: required = false) {
    return {
      type: 'string',
      format: 'password',
      required,
    };
  }

  static dateTime(required: required = false) {
    return {
      type: 'string',
      format: 'date-time',
      required,
    };
  }

  static boolean(required: required = false) {
    return {
      type: 'boolean',
      required,
    };
  }

  static integer(required: required = false) {
    return {
      type: 'integer',
      required,
    };
  }

  static array(required: required = false, type: any, maxItems: number) {
    return {
      type: 'array',
      items: {
        ...type,
        maxItems,
      },
    };
  }
}
