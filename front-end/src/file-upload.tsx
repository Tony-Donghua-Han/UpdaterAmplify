import { Button, Flex } from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import {
  ProcessFileParams,
  StorageManagerHandle,
} from "@aws-amplify/ui-react-storage/dist/types/components/StorageManager/types";
import "@aws-amplify/ui-react/styles.css";
import { MutableRefObject, useRef, useState } from "react";

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const ref = useRef() as MutableRefObject<StorageManagerHandle>;

  const processFile = async ({ file, key }: ProcessFileParams) => {
    return new Promise<ProcessFileParams>((resolve, reject) => {
      const i = setInterval(() => {
        if (uploading) {
          resolve({ file, key });
          clearInterval(i);
        }
      }, 30);
    });
  };

  const onClick = () => {
    if (fileCount > 0) {
      setUploading(true);
    }
  };

  return (
    <Flex direction="column" width="900px" margin="auto">
      <StorageManager
        acceptedFileTypes={[",jpeg", ".jpg", ".png"]}
        accessLevel="public"
        maxFileCount={1}
        processFile={processFile}
        onUploadSuccess={() => {
          setUploading(false);
        }}
        displayText={{
          getRemainingFilesText(count) {
            setFileCount(count);
            return `${count} ${count === 1 ? "file" : "files"} uploading`;
          },
        }}
        ref={ref}
      />
      <Button
        isLoading={uploading}
        onClick={onClick}
        isDisabled={fileCount <= 0}
      >
        Upload
      </Button>
      <Button
        onClick={() => {
          ref.current.clearFiles();
          setUploading(false);
          setFileCount(0);
        }}
      >
        Clear Files
      </Button>
    </Flex>
  );
};

export default FileUpload;
