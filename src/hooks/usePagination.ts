import { useState } from 'react'

export default function usePagination() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5
  })

  return [paginationModel, setPaginationModel] as const
}
