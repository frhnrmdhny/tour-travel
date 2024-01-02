import Head from 'next/head'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-[100vw] h-[100vh] flex justify-center items-center">
        <p>Page Not Found</p>
      </main>
    </>
  )
}
