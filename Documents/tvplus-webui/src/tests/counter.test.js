import { useCounter } from '../helpers/counter.js'

test('useCounter', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
  increment()
  expect(count.value).toBe(2)


})