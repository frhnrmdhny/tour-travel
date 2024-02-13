import { useRouter } from 'next/router'
import { MdArrowBack } from 'react-icons/md'

export default function BackButton() {
  const router = useRouter()

  return (
    <button className="btn btn-sm mb-2" onClick={() => router.back()}>
      <MdArrowBack />
      Kembali
    </button>
  )
}
