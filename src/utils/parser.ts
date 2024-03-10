export function sortsStringToObject(orderBy: string) {
  const orderByArray = orderBy.split(',').map((order) => order.trim())
  if (orderBy) {
    return orderByArray.map((order) => {
      if (order.startsWith('-')) {
        return { [order.substring(1)]: 'desc' }
      }
      return { [order]: 'asc' }
    })
  }
  return undefined
}
