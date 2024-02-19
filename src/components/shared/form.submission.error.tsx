import React, { FC } from "react";

interface FormSubmissionErrorProps {
  errorMessage: string | null;
}

const FormSubmissionError: FC<FormSubmissionErrorProps> = ({
  errorMessage,
}) => {
  if (!errorMessage) return <></>;

  return (
    <div className="text-red-300 my-3 bg-red-100 rounded-sm p-4">
      <p className="text-red-500 text-base font-normal">{errorMessage}</p>
    </div>
  );
};

export default FormSubmissionError;
