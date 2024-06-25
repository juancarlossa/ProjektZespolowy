'use client'
import { Button } from '@nextui-org/react';
import React, { useState, useRef, FormEvent } from 'react';
import { PictureIcon } from '../icons/icons';
import { uploadImage } from '@/app/_backend/actions/add-img-message';

export const ImageUploader: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const img = new Image()
        img.onload = () => {
          const maxDimension = 100 // Tamaño máximo en píxeles
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > maxDimension) {
              height *= maxDimension / width
              width = maxDimension
            }
          } else {
            if (height > maxDimension) {
              width *= maxDimension / height
              height = maxDimension
            }
          }

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          const resizedDataUrl = canvas.toDataURL('image/png')
          setImageSrc(resizedDataUrl)

          // Convert the data URL to a Blob
          fetch(resizedDataUrl)
            .then(res => res.blob())
            .then(blob => {
              const formData = new FormData()
              formData.append('image', new File([blob], file.name, { type: 'image/png' }))

              // Send the image to the server
              handleSubmit
            })
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (imageSrc) {
      const blob = await (await fetch(imageSrc)).blob()
      const resizedFile = new File([blob], 'resized-image.png', { type: 'image/png' })

      const formData = new FormData()
      formData.append('image', resizedFile)

      setIsLoading(true)
      const publicUrl = await uploadImage(formData)
      setIsLoading(false)

      if (publicUrl) {
        setImageUrl(publicUrl)
      }
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <Button
        isLoading={isLoading}
        isIconOnly
        onClick={handleButtonClick}
        type='submit'
        color='warning'
        className='rounded-full'
        size='md'
        variant='ghost'
      >
        <PictureIcon />
      </Button>
      {imageSrc && <img src={imageSrc} alt="Selected" style={{ marginTop: '20px', maxWidth: '100%' }} />}
      {imageUrl && (
        <div>
          <p>Image uploaded to Supabase:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a>
        </div>
      )}
    </div >
  );
};