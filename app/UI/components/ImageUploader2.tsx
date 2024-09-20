'use client'
import { Button } from '@nextui-org/react';
import { useState, useRef, useEffect } from 'react';
import { PictureIcon } from '../icons/icons';


export default function ImageUploader2({isFileUploaded, setIsFileUploaded}: {
	isFileUploaded: boolean
	setIsFileUploaded: React.Dispatch<React.SetStateAction<boolean>>
}){

  const fileInputRef = useRef<HTMLInputElement>(null);

  return <>
    <input ref={fileInputRef}
			name="file"
      type="file"
      style={{ display: 'none' }}
			onChange={(e) => setIsFileUploaded(e.target.files !== null && (e.target.files?.length > 0))}
    />

    <Button isIconOnly
      onClick={() => fileInputRef.current?.click()}
      color={isFileUploaded ? "success" : "warning"}
      className='rounded-full'
      size='md'
      variant='ghost'
    >
      <PictureIcon />
    </Button>
  </>
};