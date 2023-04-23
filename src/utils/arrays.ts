export const newArrayWithSize = <T>(size: number, fillValue: T) => new Array(size).fill(fillValue);

export const getRandomItem = <T>(items: T[]): { index: number; item: T } => {
  const index = Math.floor(Math.random() * items.length);
  const item = items[index];
  return { index, item };
};
