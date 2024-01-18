// FileDownload.tsx
'use client';
import React from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import app from '../utils/firebase';

interface FileDownloadProps {
  fileId: string; // Unique identifier or URL
  buttonText: string; // Text to display on the button
}

const FileDownload: React.FC<FileDownloadProps> = ({ fileId, buttonText }) => {
  app; // Initialize Firebase app (ensure it's initialized)

  const downloadFile = async () => {
    const storage = getStorage();
    const fileRef = ref(storage, fileId);

    try {
      const downloadURL = await getDownloadURL(fileRef);
      // Use downloadURL to navigate to the file or initiate download
      window.open(downloadURL, '_blank');
    } catch (error) {
      console.error("Error getting download URL:", error);
    }
  };

  return (
    <button onClick={downloadFile}>{buttonText}</button>
  );
};

export default FileDownload;
