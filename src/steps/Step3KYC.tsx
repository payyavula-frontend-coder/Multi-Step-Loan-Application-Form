import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, type Step3FormValues } from "../schemas/loanSchemas";
import { useLoanStore } from "../store/loanStore";

export default function Step3KYC() {
  const { formData, updateFormData, setStep } = useLoanStore();
  const [panVerified, setPanVerified] = useState(formData.panVerified || false);
  const [aadhaarVerified, setAadhaarVerified] = useState(formData.aadhaarVerified || false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Step3FormValues>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      panNumber: formData.panNumber || "",
      aadhaarNumber: formData.aadhaarNumber || "",
      aadhaarConsent: formData.aadhaarConsent || false,
      voterId: formData.voterId || "",
      passport: formData.passport || "",
    },
  });

  const verifyPAN = () => {
    const pan = getValues("panNumber");
    if (/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
      setTimeout(() => setPanVerified(true), 1000);
    } else {
      setPanVerified(false);
      alert("Please enter valid PAN first");
    }
  };

  const verifyAadhaar = () => {
    const aadhaar = getValues("aadhaarNumber");
    if (/^\d{12}$/.test(aadhaar)) {
      setTimeout(() => setAadhaarVerified(true), 1000);
    } else {
      setAadhaarVerified(false);
      alert("Please enter valid 12 digit Aadhaar first");
    }
  };

  const onSubmit = (data: Step3FormValues) => {
    if (!panVerified || !aadhaarVerified) {
      alert("Please verify PAN and Aadhaar before continuing");
      return;
    }

    updateFormData({
      ...data,
      panVerified,
      aadhaarVerified,
    });

    setStep(4);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold">Identity Verification KYC</h2>

      <div>
        <label className="mb-1 block font-medium">PAN Number</label>
        <div className="flex gap-2">
          <input
            className="w-full rounded-lg border p-3 uppercase"
            placeholder="ABCDE1234F"
            maxLength={10}
            {...register("panNumber")}
          />
          <button type="button" onClick={verifyPAN} className="rounded-lg bg-green-600 px-4 text-white">
            Verify
          </button>
        </div>
        {panVerified && <p className="mt-1 text-sm text-green-600">PAN verified successfully ✅</p>}
        {errors.panNumber && <p className="mt-1 text-sm text-red-600">{errors.panNumber.message}</p>}
      </div>

      <div>
        <label className="mb-1 block font-medium">Aadhaar Number</label>
        <div className="flex gap-2">
          <input
            className="w-full rounded-lg border p-3"
            placeholder="12 digit Aadhaar"
            maxLength={12}
            {...register("aadhaarNumber")}
          />
          <button type="button" onClick={verifyAadhaar} className="rounded-lg bg-green-600 px-4 text-white">
            Verify
          </button>
        </div>
        {aadhaarVerified && <p className="mt-1 text-sm text-green-600">Aadhaar verified successfully ✅</p>}
        {errors.aadhaarNumber && <p className="mt-1 text-sm text-red-600">{errors.aadhaarNumber.message}</p>}
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("aadhaarConsent")} />
        I give explicit consent for Aadhaar verification
      </label>
      {errors.aadhaarConsent && <p className="text-sm text-red-600">{errors.aadhaarConsent.message}</p>}

      <input className="w-full rounded-lg border p-3" placeholder="Voter ID Optional" {...register("voterId")} />

      <input className="w-full rounded-lg border p-3" placeholder="Passport Optional" {...register("passport")} />

      <div className="flex gap-3">
        <button type="button" onClick={() => setStep(2)} className="w-full rounded-xl border py-3 font-semibold">
          Back
        </button>
        <button type="submit" className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white">
          Save & Continue
        </button>
      </div>
    </form>
  );
}