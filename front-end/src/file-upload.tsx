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
  const [done, setDone] = useState(false);
  const [files, setFiles] = useState<any>({});
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
    console.log(fileCount);
    if (fileCount > 0) {
      setUploading(true);
    }
  };

  return (
    <Flex direction="column">
      <StorageManager
        acceptedFileTypes={[",jpeg", ".jpg", ".png"]}
        accessLevel="public"
        maxFileCount={1}
        processFile={processFile}
        onUploadSuccess={({ key }) => {
          setFiles((prevFiles: any) => {
            return {
              ...prevFiles,
              [key as any]: {
                status: "success",
              },
            };
          });
          setUploading(false);
          setDone(true);
        }}
        displayText={{
          getRemainingFilesText(count) {
            setFileCount(count);
            return `${count} ${count === 1 ? "file" : "files"} uploading`;
          },
        }}
        ref={ref}
      />
      {done && Object.keys(files).length > 0 ? (
        <Button
          onClick={() => {
            ref.current.clearFiles();
            setUploading(false);
            setDone(false);
            setFiles({});
            setFileCount(0);
          }}
        >
          Clear Files
        </Button>
      ) : (
        <Button isLoading={uploading} onClick={onClick} isDisabled={fileCount <= 0}>
          Upload
        </Button>
      )}
    </Flex>
  );
};

export default FileUpload;
