import Head from 'next/head'
import { signOut } from 'next-auth/react'

export default function WaitingForVerification() {
  return (
    <>
      <Head>
        <title>Waiting For Verification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="flex flex-col gap-2 text-center">
          <p>Akun menunggu verifikasi, harap hubungi Admin</p>
          <p>Harap login ulang untuk melihat perubahan</p>
          <button
            onClick={() =>
              signOut({
                callbackUrl: '/login'
              })
            }
            className="btn btn-sm btn-outline"
          >
            Keluar
          </button>
        </div>
      </main>
    </>
  )
}
