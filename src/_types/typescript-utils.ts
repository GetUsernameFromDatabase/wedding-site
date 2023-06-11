export type DeepKeyOf<T> = {
  // @ts-expect-error
  [K in keyof T]: T[K] extends object ? `${K & string}.${DeepKeyOf<T[K]>}` | K : K;
}[keyof T];
