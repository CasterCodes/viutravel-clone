import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";

interface FileUploadProps<T, V, K> {
  error: T;
  setError: Dispatch<SetStateAction<T>>;
  setUploadUrl?: Dispatch<SetStateAction<T>>;
  uploadUrl?: T;
  setUploadUrls?: Dispatch<SetStateAction<V[]>>;
  uploadUrls?: V[];
  title: K;
  multiple?: boolean;
}

const FileUpload: FC<FileUploadProps<string | null, string, string>> = ({
  error,
  setError,
  setUploadUrl,
  setUploadUrls,
  uploadUrls,
  uploadUrl,
  title,
  multiple = false,
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
          console.log({ result });
          if (multiple && setUploadUrls) {
            //@ts-expect-error
            setUploadUrls((prev) => [...prev, result.info?.secure_url]);
            return;
          }

          //@ts-ignore
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
                uploadUrl || uploadUrls?.length !== 0
                  ? "border-dotted border-2 p-3"
                  : ""
              )}
            >
              {multiple && uploadUrls?.length !== 0 ? (
                <div className="flex flex-row flex-wrap  space-x-3 space-y-3">
                  {uploadUrls?.map((url) => (
                    <Image
                      key={url}
                      alt="Destination create image"
                      src={url}
                      className="rounded-sm"
                      height={90}
                      width={120}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
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

              <div className="p-8 border-dotted border-2 flex flex-col space-y-2 justify-center items-center">
                <div className="p-2 rounded-full bg-gray-200">
                  <UploadCloud size={24} />
                </div>
                <Button
                  className=" text-neutral-700 rounded-sm bg-tranparent text-base font-semibold  hover:bg-transparent"
                  onClick={handleClick}
                >
                  {uploadUrl ? "Click to change" : " Click to upload"}
                </Button>
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default FileUpload;
