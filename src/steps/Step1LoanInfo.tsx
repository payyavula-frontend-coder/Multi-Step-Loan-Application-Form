import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1FormValues } from "../schemas/loanSchemas";
import { useLoanStore } from "../store/loanStore";

const purposes = {
  personal: ["Medical", "Education", "Wedding", "Travel", "Debt Consolidation"],
  home: ["New Home Purchase", "Home Construction", "Renovation", "Plot Purchase"],
  business: ["Working Capital", "Equipment Purchase", "Business Expansion", "Inventory"],
};

export default function Step1LoanInfo() {
  const { formData, updateFormData, setStep } = useLoanStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    } = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      loanType: formData.loanType || "personal",
      loanAmount: formData.loanAmount || "",
      loanTenure: formData.loanTenure || "",
      loanPurpose: formData.loanPurpose || "",
      referralCode: formData.referralCode || "",
    },
  });

  const selectedLoanType = watch("loanType");

  const onSubmit = (data: Step1FormValues) => {
    updateFormData(data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block font-medium">Loan Type</label>
        <div className="grid gap-3 sm:grid-cols-3">
          {["personal", "home", "business"].map((type) => (
            <label key={type} className="cursor-pointer rounded-xl border p-4">
              <input
                type="radio"
                value={type}
                {...register("loanType")}
                className="mr-2"
              />
              {type.toUpperCase()}
            </label>
          ))}
        </div>
        {errors.loanType && (
          <p className="mt-1 text-sm text-red-600">{errors.loanType.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">Loan Amount</label>
        <input
          type="number"
          placeholder="Enter loan amount"
          {...register("loanAmount")}
          className="w-full rounded-lg border p-3"
        />
        {errors.loanAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.loanAmount.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">Loan Tenure</label>
        <select {...register("loanTenure")} className="w-full rounded-lg border p-3">
          <option value="">Select tenure</option>
          <option value="12">12 months</option>
          <option value="24">24 months</option>
          <option value="36">36 months</option>
          <option value="60">60 months</option>
          <option value="120">120 months</option>
          <option value="240">240 months</option>
          <option value="360">360 months</option>
        </select>
        {errors.loanTenure && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTenure.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">Loan Purpose</label>
        <select {...register("loanPurpose")} className="w-full rounded-lg border p-3">
          <option value="">Select purpose</option>
          {selectedLoanType &&
            purposes[selectedLoanType].map((purpose) => (
              <option key={purpose} value={purpose}>
                {purpose}
              </option>
            ))}
        </select>
        {errors.loanPurpose && (
          <p className="mt-1 text-sm text-red-600">{errors.loanPurpose.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">Referral Code Optional</label>
        <input
          type="text"
          placeholder="Example: REF123"
          {...register("referralCode")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Save & Continue
      </button>
    </form>
  );
}