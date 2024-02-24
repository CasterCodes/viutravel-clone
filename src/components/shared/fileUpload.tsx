import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps<T, K> {
  error: T;
  setError: Dispatch<SetStateAction<T>>;
  setUploadUrl: Dispatch<SetStateAction<T>>;
  uploadUrl: T;
  title: K;
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
            <div
              className={cn(
                "flex flex-col space-y-4",
                uploadUrl ? "border-dotted border-2 p-3" : ""
              )}
            >
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
                className="p-8 border-dotted border-2 text-neutral-700 rounded-sm bg-tranparent text-lg font-semibold uppercase hover:bg-transparent"
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
