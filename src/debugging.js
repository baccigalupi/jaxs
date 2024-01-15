export const debug = (...message) => {
  if (process.env.DEBUG === 'true') {
    console.log(...message)
  }
}
