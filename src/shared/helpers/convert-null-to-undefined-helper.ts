type ConvertNullToUndefined<Type> = {
  [Property in keyof Type]: Extract<null, Type[Property]> extends never
    ? Type[Property]
    : Exclude<Type[Property], null> | undefined;
};

type Entries<Type> = [keyof Type, Type[keyof Type]][];

export const convertNullToUndefined = <
  Model extends { [Property in keyof Model]: Model[Property] | null },
>(
  model: Model,
): ConvertNullToUndefined<Model> => {
  const modelEntries = Object.entries(model) as Entries<Model>;

  const mappedModelEntries = modelEntries.map(
    (entry): [keyof Model, typeof model[keyof Model] | undefined] => {
      const [key, value] = entry;

      if (value === null) return [key, undefined];

      return [key, value];
    },
  );

  const convertedModel = Object.fromEntries(
    mappedModelEntries,
  ) as ConvertNullToUndefined<Model>;

  return convertedModel;
};
