'use client';
import { useState } from 'react';
import { useEdgeStore } from '../_lib/edgestore';

export default function Page() {
  const [file, setFile] = useState(null);
  const { edgestore } = useEdgeStore();

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
            console.log(file);
          }
        }}
      >
        Upload
      </button>
    </div>
  );
}