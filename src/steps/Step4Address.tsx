import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema, type Step4FormValues } from "../schemas/loanSchemas";
import { useLoanStore } from "../store/loanStore";

const pinCodeData: Record<string, { city: string; state: string; postOffice: string }> = {
  "500001": { city: "Hyderabad", state: "Telangana", postOffice: "Abids" },
  "506101": { city: "Mahabubabad", state: "Telangana", postOffice: "Mahabubabad" },
  "110001": { city: "New Delhi", state: "Delhi", postOffice: "Connaught Place" },
  "560001": { city: "Bengaluru", state: "Karnataka", postOffice: "Bangalore GPO" },
};

export default function Step4Address() {
  const { formData, updateFormData, setStep } = useLoanStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step4FormValues>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      currentAddressLine1: formData.currentAddressLine1 || "",
      currentAddressLine2: formData.currentAddressLine2 || "",
      pinCode: formData.pinCode || "",
      city: formData.city || "",
      state: formData.state || "",
      postOffice: formData.postOffice || "",
      residenceType: formData.residenceType || "",
      rentAmount: formData.rentAmount || "",
      yearsAtCurrentAddress: formData.yearsAtCurrentAddress || "",
      sameAsPermanent: formData.sameAsPermanent ?? true,
      permanentAddressLine1: formData.permanentAddressLine1 || "",
      permanentPinCode: formData.permanentPinCode || "",
    },
  });

  const residenceType = watch("residenceType");
  const sameAsPermanent = watch("sameAsPermanent");

  const handlePinLookup = (pin: string) => {
    if (pin.length === 6 && pinCodeData[pin]) {
      setValue("city", pinCodeData[pin].city);
      setValue("state", pinCodeData[pin].state);
      setValue("postOffice", pinCodeData[pin].postOffice);
    }
  };

  const onSubmit = (data: Step4FormValues) => {
    updateFormData(data);
    setStep(5);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold">Address Information</h2>

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Current Address Line 1"
        {...register("currentAddressLine1")}
      />
      {errors.currentAddressLine1 && <p className="text-sm text-red-600">{errors.currentAddressLine1.message}</p>}

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Current Address Line 2 Optional"
        {...register("currentAddressLine2")}
      />

      <input
        className="w-full rounded-lg border p-3"
        placeholder="PIN Code Example 500001"
        maxLength={6}
        {...register("pinCode")}
        onChange={(e) => handlePinLookup(e.target.value)}
      />
      {errors.pinCode && <p className="text-sm text-red-600">{errors.pinCode.message}</p>}

      <input className="w-full rounded-lg border p-3" placeholder="City" {...register("city")} />
      {errors.city && <p className="text-sm text-red-600">{errors.city.message}</p>}

      <input className="w-full rounded-lg border p-3" placeholder="State" {...register("state")} />
      {errors.state && <p className="text-sm text-red-600">{errors.state.message}</p>}

      <input className="w-full rounded-lg border p-3" placeholder="Post Office" {...register("postOffice")} />

      <select className="w-full rounded-lg border p-3" {...register("residenceType")}>
        <option value="">Select Residence Type</option>
        <option value="owned">Owned</option>
        <option value="rented">Rented</option>
        <option value="company">Company Provided</option>
        <option value="family">Family</option>
      </select>
      {errors.residenceType && <p className="text-sm text-red-600">{errors.residenceType.message}</p>}

      {residenceType === "rented" && (
        <input className="w-full rounded-lg border p-3" placeholder="Monthly Rent Amount" {...register("rentAmount")} />
      )}

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Years at Current Address"
        type="number"
        {...register("yearsAtCurrentAddress")}
      />
      {errors.yearsAtCurrentAddress && <p className="text-sm text-red-600">{errors.yearsAtCurrentAddress.message}</p>}

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("sameAsPermanent")} />
        Permanent address same as current address
      </label>

      {!sameAsPermanent && (
        <>
          <input
            className="w-full rounded-lg border p-3"
            placeholder="Permanent Address Line 1"
            {...register("permanentAddressLine1")}
          />
          <input
            className="w-full rounded-lg border p-3"
            placeholder="Permanent PIN Code"
            maxLength={6}
            {...register("permanentPinCode")}
          />
        </>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={() => setStep(3)} className="w-full rounded-xl border py-3 font-semibold">
          Back
        </button>
        <button type="submit" className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white">
          Save & Continue
        </button>
      </div>
    </form>
  );
}