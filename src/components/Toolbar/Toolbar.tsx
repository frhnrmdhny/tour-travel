import { useDebouncedCallback } from 'use-debounce'

type Props = {
  children?: React.ReactNode
  onChange: (value: string) => void
  handleAdd?: () => void
}

export default function Toolbar({ children, onChange, handleAdd }: Props) {
  const debounced = useDebouncedCallback((value: string) => {
    try {
      onChange(value)
    } catch (error) {}
  }, 1000)

  return (
    <div className="mb-2 flex gap-2 justify-between w-full">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          onChange={(e) => debounced(e.target.value)}
          type="text"
          className="grow"
          placeholder="Cari data..."
        />
      </label>

      {handleAdd && (
        <div className="gap-2 flex">
          <button
            onClick={handleAdd}
            className="btn btn-md rounded-full bg-[#01B9DE] hover:bg-sky-600 text-white"
          >
            + Tambah
          </button>

          {children}
        </div>
      )}
    </div>
  )
}
