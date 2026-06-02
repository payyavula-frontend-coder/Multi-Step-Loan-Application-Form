import Step1LoanInfo from "../../steps/Step1LoanInfo";
import Step2PersonalInfo from "../../steps/Step2PersonalInfo";
import Step3KYC from "../../steps/Step3KYC";
import { useLoanStore } from "../../store/loanStore";
import Step4Address from "../../steps/Step4Address";
import Step5Employment from "../../steps/Step5Employment";
import Step6CoApplicant from "../../steps/Step6CoApplicant";
import Step7Documents from "../../steps/Step7Documents";
import Step8ESignature from "../../steps/Step8ESignature";
import Step9Summary from "../../steps/Step9Summary";
import Stepper from "../layout/Stepper";

export default function LoanWizard() {
  const { currentStep } = useLoanStore();

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">LendSwift Loan Application</h1>
        <p className="mt-1 text-sm text-slate-500">Step {currentStep} of 9</p>

        <div className="mt-6">
          {currentStep === 1 && <Step1LoanInfo />}
          {currentStep === 2 && <Step2PersonalInfo />}
          {currentStep === 3 && <Step3KYC />}
          {currentStep === 4 && <Step4Address />}
          {currentStep === 5 && <Step5Employment />}
          {currentStep === 6 && <Step6CoApplicant />}
          {currentStep === 7 && <Step7Documents />}
          {currentStep === 8 && <Step8ESignature />}
          {currentStep === 9 && <Step9Summary />}
          <Stepper />
        </div>
      </div>
    </div>
  );
}