export type DeepKeyOf<T> = {
  // @ts-expect-error not intended to be used with with types other than string and object so fine to ignore
  [K in keyof T]: T[K] extends object ? `${K & string}.${DeepKeyOf<T[K]>}` | K : K;
}[keyof T];
