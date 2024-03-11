import { type PutBlobResult } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import Image from 'next/image'
import { useState, useRef } from 'react'

interface Props {
  onUrlChange: (url: string) => void
  currentProfilePictureUrl?: string
}

export default function ProfilePictureUpload({
  onUrlChange,
  currentProfilePictureUrl
}: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const [fileName, setFileName] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  return (
    <div className="flex gap-2">
      <div>
        <p className="mb-2">Photo</p>

        <form
          className="flex flex-col gap-2"
          onSubmit={async (event) => {
            event.preventDefault()

            if (!inputFileRef.current?.files) return

            const file = inputFileRef.current.files[0]

            if (!file) return

            setIsUploading(true)
            const newBlob = await upload(file.name, file, {
              access: 'public',
              handleUploadUrl: '/api/upload'
            })
            setIsUploading(false)
            setFileName(file.name)
            setBlob(newBlob)
            onUrlChange(newBlob.url)
          }}
        >
          <input
            type="file"
            ref={inputFileRef}
            className="file-input w-full max-w-xs"
            required
          />

          <button className="btn btn-sm" type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <span className="loading loading-spinner"></span>
                Uploading
              </>
            ) : (
              `Upload`
            )}
          </button>
        </form>
      </div>

      {blob && (
        <div>
          <Image
            unoptimized
            width={150}
            height={150}
            src={blob.url}
            alt={fileName}
          />
        </div>
      )}

      {!blob && currentProfilePictureUrl && (
        <div>
          <Image
            unoptimized
            width={150}
            height={150}
            src={currentProfilePictureUrl}
            alt={fileName}
          />
        </div>
      )}
    </div>
  )
}
