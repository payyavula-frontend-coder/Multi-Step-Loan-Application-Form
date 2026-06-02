import { useLoanStore } from "../../store/loanStore";

const steps = [
  "Loan",
  "Personal",
  "KYC",
  "Address",
  "Employment",
  "Family",
  "Documents",
  "Signature",
  "Summary",
];

export default function Stepper() {
  const { currentStep } = useLoanStore();

  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between text-xs">
        <span>Progress</span>
        <span>{currentStep}/9</span>
      </div>

      <div className="mb-4 h-2 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all"
          style={{ width: `${(currentStep / 9) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-9">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          return (
            <div
              key={step}
              className={`rounded-lg p-2 text-center text-xs font-medium
              ${
                stepNumber === currentStep
                  ? "bg-blue-600 text-white"
                  : stepNumber < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}