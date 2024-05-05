import { useRouter } from 'next/router'
import { MdArrowBack } from 'react-icons/md'

type Props = {
  label: string
}

export default function BackButton({ label }: Props) {
  const router = useRouter()

  return (
    <div className="flex items-center mb-2 gap-2">
      <button className="btn btn-sm" onClick={() => router.back()}>
        <MdArrowBack />
        Kembali
      </button>

      {label && (
        <h1 className="font-bold text-gray-800 text-poppins">{label}</h1>
      )}
    </div>
  )
}
