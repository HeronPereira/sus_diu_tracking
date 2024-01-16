// FileDownload.tsx
'use client';
import React from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import app from '../utils/firebase';

interface FileDownloadProps {
  fileId: string; // Unique identifier or URL
}

const FileDownload: React.FC<FileDownloadProps> = ({ fileId }) => {
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
    <button onClick={downloadFile}>Download PDF</button>
  );
};

export default FileDownload;
