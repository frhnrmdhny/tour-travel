import { useDebouncedCallback } from 'use-debounce'

export default function InlineInput({
  initialValue,
  onChange
}: {
  initialValue: number
  onChange: (value: number) => void
}) {
  const debounced = useDebouncedCallback((value: string) => {
    try {
      onChange(parseInt(value))
    } catch (error) {}
  }, 1000)

  return (
    <input
      className="input input-bordered input-sm w-full max-w-72"
      defaultValue={initialValue}
      onChange={(e) => debounced(e.target.value)}
      type="number"
    />
  )
}
