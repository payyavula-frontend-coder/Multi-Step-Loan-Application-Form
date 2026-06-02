import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, type Step2FormValues } from "../schemas/loanSchemas";
import { useLoanStore } from "../store/loanStore";

export default function Step2PersonalInfo() {
  const { formData, updateFormData, setStep } = useLoanStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData,
  });

  const onSubmit = (data: Step2FormValues) => {
    updateFormData(data);
    setStep(3);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold">Personal Information</h2>

      <input className="w-full rounded-lg border p-3" placeholder="Full Name as per PAN" {...register("fullName")} />
      {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}

      <input type="date" className="w-full rounded-lg border p-3" {...register("dateOfBirth")} />
      {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>}

      <select className="w-full rounded-lg border p-3" {...register("gender")}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <p className="text-sm text-red-600">{errors.gender.message}</p>}

      <select className="w-full rounded-lg border p-3" {...register("maritalStatus")}>
        <option value="">Select Marital Status</option>
        <option value="single">Single</option>
        <option value="married">Married</option>
      </select>
      {errors.maritalStatus && <p className="text-sm text-red-600">{errors.maritalStatus.message}</p>}

      <input className="w-full rounded-lg border p-3" placeholder="Father's Name" {...register("fatherName")} />
      {errors.fatherName && <p className="text-sm text-red-600">{errors.fatherName.message}</p>}

      <input className="w-full rounded-lg border p-3" placeholder="Mother's Name" {...register("motherName")} />
      {errors.motherName && <p className="text-sm text-red-600">{errors.motherName.message}</p>}

      <input type="email" className="w-full rounded-lg border p-3" placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

      <input className="w-full rounded-lg border p-3" placeholder="Mobile Number" {...register("mobileNumber")} />
      {errors.mobileNumber && <p className="text-sm text-red-600">{errors.mobileNumber.message}</p>}

      <input className="w-full rounded-lg border p-3" placeholder="Alternate Mobile Optional" {...register("alternateMobile")} />

      <div className="flex gap-3">
        <button type="button" onClick={() => setStep(1)} className="w-full rounded-xl border py-3 font-semibold">
          Back
        </button>
        <button type="submit" className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white">
          Save & Continue
        </button>
      </div>
    </form>
  );
}