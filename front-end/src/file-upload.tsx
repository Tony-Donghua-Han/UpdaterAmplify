import { Storage } from "aws-amplify";
import { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState<any>(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const uploadFile = () => {
        if (!file) return;
        try {
            Storage.put(file.name, file);
            console.log('File uploaded successfully');
        } catch (error) {
            console.log('Error uploading file', error);
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Upload File</button>
        </div>
    );
}

export default FileUpload;