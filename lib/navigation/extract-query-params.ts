export const extractQueryParams = (queryString: string) => {
  return queryString
    .replace(/^\?/, '')
    .split('&')
    .reduce((aggregate, pairString) => {
      if (!pairString) return aggregate

      const pair = pairString.split('=')
      aggregate[pair[0]] = pair[1]
      return aggregate
    }, {})
}
