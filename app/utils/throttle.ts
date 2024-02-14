export const throttle = (callback: any, delay: number) => {
  let throttled = false

  return (...args: any) => {
    if (!throttled) {
      throttled = true
      setTimeout(() => {
        callback(...args)
        throttled = false
      }, delay)
    }
  }
}
