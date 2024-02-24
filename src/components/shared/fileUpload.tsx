import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "../ui/button";

interface FileUploadProps<T, K> {
  error: T;
  setError(value: T): void;
  uploadUrl: T;
  title: K;
  setUploadUrl(value: T): void;
}

const FileUpload: FC<FileUploadProps<string | null, string>> = ({
  error,
  setError,
  setUploadUrl,
  uploadUrl,
  title,
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <span className="font-bold uppercase leading-snug text-neutral-800/90">
        {title}
      </span>
      <CldUploadWidget
        options={{ sources: ["local", "unsplash"] }}
        signatureEndpoint={"/api/cloudinary/sign"}
        onSuccess={(result, { widget }) => {
          // @ts-ignore
          setUploadUrl(result.info?.secure_url);
        }}
      >
        {({ open }) => {
          const handleClick = () => {
            if (error) setError(null);
            open();
          };
          return (
            <div className="flex flex-col space-y-4 border-dotted border-2 p-3">
              {uploadUrl ? (
                <Image
                  alt="Destination create image"
                  src={uploadUrl}
                  className="rounded-sm"
                  height={90}
                  width={120}
                />
              ) : (
                <></>
              )}
              <Button
                className="p-12 border-dotted border-2 text-neutral-700 rounded-sm bg-tranparent text-lg font-semibold uppercase hover:bg-transparent"
                onClick={handleClick}
              >
                {uploadUrl ? "Click to change" : " Click to upload"}
              </Button>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default FileUpload;
