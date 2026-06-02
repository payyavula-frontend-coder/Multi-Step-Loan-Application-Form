import { useLoanStore } from "../store/loanStore";

export default function Step9Summary() {
  const { formData, setStep, resetApplication } = useLoanStore();
  const loanAmount = Number(formData.loanAmount || 0);
const tenure = Number(formData.loanTenure || 1);

const interestRate =
  formData.loanType === "home" ? 8.5 :
  formData.loanType === "business" ? 12 :
  10.5;

const monthlyRate = interestRate / 12 / 100;

const emi =
  loanAmount > 0
    ? Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
          (Math.pow(1 + monthlyRate, tenure) - 1)
      )
    : 0;

const score =
  formData.panVerified && formData.aadhaarVerified && formData.signature
    ? 92
    : 70;

const applicationId = `LS${Date.now().toString().slice(-8)}`;

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-blue-50 p-4">
  <h3 className="font-semibold text-blue-700">Loan Eligibility</h3>
  <p><b>Eligibility Score:</b> {score}%</p>
  <p><b>Interest Rate:</b> {interestRate}%</p>
  <p><b>Estimated EMI:</b> ₹{emi}</p>
  <p><b>Application ID:</b> {applicationId}</p>
</div>
      <h2 className="text-xl font-semibold">Pre-Approval Summary</h2>

      <div className="rounded-xl bg-green-50 p-4">
        <h3 className="font-semibold text-green-700">Application Status</h3>
        <p className="text-green-700">You are eligible for pre-approval ✅</p>
      </div>

      <div className="grid gap-3 rounded-xl border p-4 text-sm">
        <p><b>Loan Type:</b> {formData.loanType}</p>
        <p><b>Loan Amount:</b> ₹{formData.loanAmount}</p>
        <p><b>Tenure:</b> {formData.loanTenure} months</p>
        <p><b>Purpose:</b> {formData.loanPurpose}</p>
        <p><b>Name:</b> {formData.fullName}</p>
        <p><b>Email:</b> {formData.email}</p>
        <p><b>Mobile:</b> {formData.mobileNumber}</p>
        <p><b>PAN Verified:</b> {formData.panVerified ? "Yes ✅" : "No"}</p>
        <p><b>Aadhaar Verified:</b> {formData.aadhaarVerified ? "Yes ✅" : "No"}</p>
        <p><b>Address:</b> {formData.currentAddressLine1}, {formData.city}, {formData.state}</p>
        <p><b>Employment:</b> {formData.employmentType}</p>
        <p><b>Co-applicant:</b> {formData.hasCoApplicant}</p>
        <p><b>Dependents:</b> {formData.numberOfDependents}</p>
      </div>

      {formData.signature && (
        <div className="rounded-xl border p-4">
          <h3 className="mb-2 font-semibold">Captured Signature</h3>
          <img src={formData.signature} alt="Signature" className="h-32 rounded border" />
        </div>
      )}

     <div className="flex gap-3 print:hidden">
  <button onClick={() => setStep(8)} className="w-full rounded-xl border py-3 font-semibold">
    Back
  </button>

  <button
    onClick={() => window.print()}
    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white"
  >
    Print / Download PDF
  </button>

 <button
 onClick={() => {
  alert(`Application submitted successfully!\nApplication ID: ${applicationId}`);

  resetApplication();

  localStorage.removeItem("lendswift-loan-application");

  setTimeout(() => {
    window.location.reload();
  }, 300);
}}
  className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white"
>
  Submit Application
</button>
    
</div>
    </div>
    
  );
}