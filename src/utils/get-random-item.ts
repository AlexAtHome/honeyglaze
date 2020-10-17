export function getRandomItemFrom<T = never>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
