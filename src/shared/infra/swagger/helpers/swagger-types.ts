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
}
