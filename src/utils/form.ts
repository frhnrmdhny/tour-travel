import dayjs from 'dayjs'

export function getDirtyFields<T>(
  dirtyFields: Record<string, boolean>,
  formValues: Record<string, string | Date | number | null>
) {
  return Object.keys(dirtyFields).reduce<
    Record<string, string | Date | number>
  >((accumulator, key) => {
    const value = formValues[key]
    if (value) accumulator[key] = value
    return accumulator
  }, {}) as T
}

export function transformStringToDate<T>(
  attributes: string[],
  data: Record<string, string | Date>
) {
  const result = { ...data }
  attributes.forEach((item) => {
    const value = result[item]
    if (typeof value === 'string') {
      result[item] = dayjs(value).toDate()
    }
  })
  return result as T
}
