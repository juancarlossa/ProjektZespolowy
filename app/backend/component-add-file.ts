import { useState } from 'react'

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (event) => {
    setError(null)
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      // Opcjonalna walidacja typu pliku
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
      if (!validTypes.includes(selectedFile.type)) {
        setError('Invalid file type. Please select a JPEG, PNG, or PDF file.')
        setFile(null)
        return
      }
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      await onFileUpload(formData)
      setFile(null)
    } catch (uploadError) {
      setError('File upload failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default FileUpload
