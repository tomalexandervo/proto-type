
import faker from 'faker';

export const generate = (count = 50) => {
  return new Array(count)
    .fill()
    .map(_ => faker.random.word().toLowerCase())
    .join(' ');
};