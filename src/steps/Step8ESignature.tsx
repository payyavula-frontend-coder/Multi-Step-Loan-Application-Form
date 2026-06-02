import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useLoanStore } from "../store/loanStore";

export default function Step8ESignature() {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const { updateFormData, setStep } = useLoanStore();

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const saveSignature = () => {
    if (sigCanvas.current?.isEmpty()) {
      alert("Please provide your signature");
      return;
    }

   const signatureImage = sigCanvas.current
  ?.getCanvas()
  .toDataURL("image/png");

    updateFormData({
      signature: signatureImage,
    });

    setStep(9);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">E-Signature</h2>

      <div className="rounded-xl border p-4">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: 700,
            height: 250,
            className: "border rounded-lg w-full",
          }}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={clearSignature}
          className="rounded-xl bg-red-500 px-5 py-3 text-white"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={() => setStep(7)}
          className="rounded-xl border px-5 py-3"
        >
          Back
        </button>

        <button
          type="button"
          onClick={saveSignature}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}