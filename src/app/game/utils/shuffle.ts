export function shuffle<T>(arr: T[]): T[] {
  for (let first = arr.length - 1; first > 0; first -= 1) {
    const second = Math.floor(Math.random() * (first + 1));
    [arr[first], arr[second]] = [arr[second], arr[first]];
  }
  return arr;
}
