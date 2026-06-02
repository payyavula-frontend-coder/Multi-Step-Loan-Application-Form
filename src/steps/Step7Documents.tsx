import { useDropzone } from "react-dropzone";
import { useLoanStore } from "../store/loanStore";

type UploadBoxProps = {
  title: string;
  file?: File | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
};

function UploadBox({ title, file, onFileSelect, onRemove }: UploadBoxProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
  });

  const isValidFile = file instanceof File;
  const isImage = isValidFile && file.type.startsWith("image/");

  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-2 font-semibold">{title}</h3>

      {!isValidFile ? (
        <div
          {...getRootProps()}
          className="cursor-pointer rounded-lg border-2 border-dashed p-6 text-center text-slate-500"
        >
          <input {...getInputProps()} />
          Drag & drop file here or click to upload
          <p className="mt-1 text-xs">PDF, JPG, PNG only. Max 5MB.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm font-medium text-green-700">
            Uploaded: {file.name}
          </p>

          {isImage ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-32 rounded-lg border object-cover"
            />
          ) : (
            <p className="rounded-lg bg-slate-100 p-3 text-sm">
              PDF Preview: {file.name}
            </p>
          )}

          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default function Step7Documents() {
  const { formData, updateFormData, setStep } = useLoanStore();

  const handleContinue = () => {
    if (
      !(formData.panCardFile instanceof File) ||
      !(formData.aadhaarFile instanceof File) ||
      !(formData.incomeProofFile instanceof File)
    ) {
      alert("Please upload PAN, Aadhaar and Income Proof documents");
      return;
    }

    setStep(8);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Document Upload</h2>

      <UploadBox
        title="PAN Card"
        file={formData.panCardFile as File | null}
        onFileSelect={(file) => updateFormData({ panCardFile: file })}
        onRemove={() => updateFormData({ panCardFile: null })}
      />

      <UploadBox
        title="Aadhaar Card"
        file={formData.aadhaarFile as File | null}
        onFileSelect={(file) => updateFormData({ aadhaarFile: file })}
        onRemove={() => updateFormData({ aadhaarFile: null })}
      />

      <UploadBox
        title="Income Proof"
        file={formData.incomeProofFile as File | null}
        onFileSelect={(file) => updateFormData({ incomeProofFile: file })}
        onRemove={() => updateFormData({ incomeProofFile: null })}
      />

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep(6)}
          className="w-full rounded-xl border py-3 font-semibold"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}