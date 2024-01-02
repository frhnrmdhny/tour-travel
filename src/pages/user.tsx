import Head from 'next/head'
import { api } from '~/utils/api'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
import { type User } from '@prisma/client'

export default function User() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5
  })

  const { data, isLoading } = api.user.getUsers.useQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize
  })

  const columns = useMemo(
    () =>
      [
        { field: 'name', headerName: 'Nama', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
          field: 'verificationStatus',
          headerName: 'Status Verifikasi',
          flex: 1,
          renderCell: (params) => {
            const { verificationStatus } = params.row

            return (
              <button
                className={`btn btn-sm ${
                  verificationStatus === 'VERIFIED'
                    ? 'btn-success'
                    : 'btn-warning'
                }`}
              >
                {verificationStatus === 'VERIFIED'
                  ? 'Terverifikasi'
                  : 'Belum Terverifikasi'}
              </button>
            )
          }
        }
      ] satisfies GridColDef<User>[],
    []
  )

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <DataGrid
          rows={data?.users ?? []}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          rowCount={data?.pagination.rowCount ?? 0}
          rowSelection={false}
        />
      </main>
    </>
  )
}
