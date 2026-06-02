export type LoanType = "personal" | "home" | "business";

export interface LoanFormData {
  loanType: LoanType | "";
  loanAmount: string;
  loanTenure: string;
  loanPurpose: string;
  referralCode?: string;

  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  fatherName?: string;
  motherName?: string;
  email?: string;
  mobileNumber?: string;
  alternateMobile?: string;

  panNumber?: string;
aadhaarNumber?: string;
aadhaarConsent?: boolean;
voterId?: string;
passport?: string;
panVerified?: boolean;
aadhaarVerified?: boolean;

currentAddressLine1?: string;
currentAddressLine2?: string;
pinCode?: string;
city?: string;
state?: string;
postOffice?: string;
residenceType?: string;
rentAmount?: string;
yearsAtCurrentAddress?: string;
sameAsPermanent?: boolean;
permanentAddressLine1?: string;
permanentPinCode?: string;

employmentType?: string;
companyName?: string;
designation?: string;
monthlySalary?: string;
yearsOfExperience?: string;
businessName?: string;
businessType?: string;
annualTurnover?: string;
yearsInBusiness?: string;

hasCoApplicant?: string;
coApplicantName?: string;
coApplicantRelation?: string;
coApplicantIncome?: string;
spouseName?: string;
numberOfDependents?: string;

panCardFile?: File | null;
aadhaarFile?: File | null;
incomeProofFile?: File | null;

signature?: string;


}