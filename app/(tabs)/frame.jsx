import { Editor } from '@pixlrlte/pixlr-sdk';
import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  const frame = useRef(null);
  const fileInput = useRef(null);

  let editor;

  useEffect(() => {
    const inputElement = fileInput.current;

    const handleFileChange = async (event) => {
      const files = event.target.files;
      if (files.length > 0) {
        const file = files[0];

        if (!editor) {
          editor = await Editor.connect('your-token-here', frame.current);
        }

        for await (const newFile of editor.open(file)) {
          console.log('Opened file:', newFile);
        }
      }
    };

    if (inputElement) {
      inputElement.addEventListener('change', handleFileChange);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('change', handleFileChange);
      }
    };
  }, []);

  return (
    <div>
      <iframe id="your-iframe-id" ref={frame}></iframe>
      <input type="file" id="your-file-input-id" ref={fileInput} />
    </div>
  );
};
