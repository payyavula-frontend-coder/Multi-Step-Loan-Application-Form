import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step5Schema, type Step5FormValues } from "../schemas/loanSchemas";
import { useLoanStore } from "../store/loanStore";

export default function Step5Employment() {
  const { formData, updateFormData, setStep } = useLoanStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step5FormValues>({
    resolver: zodResolver(step5Schema),
    defaultValues: formData,
  });

  const employmentType = watch("employmentType");

  const onSubmit = (data: Step5FormValues) => {
    updateFormData(data);
    setStep(6);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold">Employment & Income Details</h2>

      <div>
        <label className="mb-2 block font-medium">Employment Type</label>
        <div className="grid gap-3 sm:grid-cols-3">
          {["salaried", "self-employed", "business-owner"].map((type) => (
            <label key={type} className="cursor-pointer rounded-xl border p-4">
              <input type="radio" value={type} {...register("employmentType")} className="mr-2" />
              {type}
            </label>
          ))}
        </div>
        {errors.employmentType && (
          <p className="mt-1 text-sm text-red-600">{errors.employmentType.message}</p>
        )}
      </div>

      {employmentType === "salaried" && (
        <>
          <input className="w-full rounded-lg border p-3" placeholder="Company Name" {...register("companyName")} />
          <input className="w-full rounded-lg border p-3" placeholder="Designation" {...register("designation")} />
          <input
            type="number"
            className="w-full rounded-lg border p-3"
            placeholder="Monthly Net Salary"
            {...register("monthlySalary")}
          />
          <input
            type="number"
            className="w-full rounded-lg border p-3"
            placeholder="Years of Experience"
            {...register("yearsOfExperience")}
          />
        </>
      )}

      {(employmentType === "self-employed" || employmentType === "business-owner") && (
        <>
          <input className="w-full rounded-lg border p-3" placeholder="Business Name" {...register("businessName")} />

          <select className="w-full rounded-lg border p-3" {...register("businessType")}>
            <option value="">Select Business Type</option>
            <option value="trading">Trading</option>
            <option value="service">Service</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail</option>
          </select>

          <input
            type="number"
            className="w-full rounded-lg border p-3"
            placeholder="Annual Turnover"
            {...register("annualTurnover")}
          />

          <input
            type="number"
            className="w-full rounded-lg border p-3"
            placeholder="Years in Business"
            {...register("yearsInBusiness")}
          />
        </>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={() => setStep(4)} className="w-full rounded-xl border py-3 font-semibold">
          Back
        </button>
        <button type="submit" className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white">
          Save & Continue
        </button>
      </div>
    </form>
  );
}