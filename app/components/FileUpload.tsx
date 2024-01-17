// FileUpload.tsx
'use client';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import app from '../utils/firebase';

const FileUpload = ({setUploadedFileId, text}:{setUploadedFileId: (inf: any)=>void, text: string}) => {
  app; // Initialize Firebase app (ensure it's initialized)
  const storage = getStorage();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    // Generate a unique identifier for the file using uuid
    const fileId = uuidv4();
    
    const storageRef = ref(storage, fileId);

    try {
      await uploadBytes(storageRef, file);
      console.log("File uploaded successfully!");
      setUploadedFileId(fileId);
      // Now you can use the fileId for further actions (e.g., store it in a database)
      console.log("FileId:", fileId);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>{text}</p>
    </div>
  );
};

export default FileUpload;

