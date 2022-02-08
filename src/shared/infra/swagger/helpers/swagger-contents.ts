type properties = [property: string, type: any][];
type propertiesExamples = [property: string, example: any][];

export class SwaggerContents {
  static applicationJson(
    properties: properties,
    propertiesExamples: propertiesExamples
  ) {
    return {
      'application/json': {
        schema: {
          type: 'object',
          properties: Object.fromEntries(properties),
        },
        ...(propertiesExamples?.length > 0
          ? { example: Object.fromEntries(propertiesExamples) }
          : {}),
      },
    };
  }
}
