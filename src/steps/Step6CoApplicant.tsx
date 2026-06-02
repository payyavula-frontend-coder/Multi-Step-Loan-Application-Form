import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step6Schema, type Step6FormValues } from "../schemas/loanSchemas";
import { useLoanStore } from "../store/loanStore";

export default function Step6CoApplicant() {
  const { formData, updateFormData, setStep } = useLoanStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step6FormValues>({
    resolver: zodResolver(step6Schema),
    defaultValues: formData,
  });

  const hasCoApplicant = watch("hasCoApplicant");

  const onSubmit = (data: Step6FormValues) => {
    updateFormData(data);
    setStep(7);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold">Co-applicant & Family Details</h2>

      <select className="w-full rounded-lg border p-3" {...register("hasCoApplicant")}>
        <option value="">Do you have a co-applicant?</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      {errors.hasCoApplicant && (
        <p className="text-sm text-red-600">{errors.hasCoApplicant.message}</p>
      )}

      {hasCoApplicant === "yes" && (
        <>
          <input
            className="w-full rounded-lg border p-3"
            placeholder="Co-applicant Name"
            {...register("coApplicantName")}
          />

          <select className="w-full rounded-lg border p-3" {...register("coApplicantRelation")}>
            <option value="">Select Relation</option>
            <option value="spouse">Spouse</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="sibling">Sibling</option>
          </select>

          <input
            type="number"
            className="w-full rounded-lg border p-3"
            placeholder="Co-applicant Monthly Income"
            {...register("coApplicantIncome")}
          />
        </>
      )}

      {formData.maritalStatus === "married" && (
        <input
          className="w-full rounded-lg border p-3"
          placeholder="Spouse Name"
          {...register("spouseName")}
        />
      )}

      <input
        type="number"
        className="w-full rounded-lg border p-3"
        placeholder="Number of Dependents"
        {...register("numberOfDependents")}
      />
      {errors.numberOfDependents && (
        <p className="text-sm text-red-600">{errors.numberOfDependents.message}</p>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={() => setStep(5)} className="w-full rounded-xl border py-3 font-semibold">
          Back
        </button>
        <button type="submit" className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white">
          Save & Continue
        </button>
      </div>
    </form>
  );
}