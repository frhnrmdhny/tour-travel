import { useState } from 'react'

export default function usePagination<T = undefined, U = undefined>() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
    where: undefined as T,
    orderBy: undefined as U
  })

  return [paginationModel, setPaginationModel] as const
}
