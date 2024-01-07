import { signIn } from 'next-auth/react'

export default function Home() {
  return (
    <main>
      <div>
        <button
          className="btn btn-primary"
          onClick={() =>
            signIn(undefined, {
              callbackUrl: '/dashboard'
            })
          }
        >
          Sign In
        </button>
      </div>
    </main>
  )
}
