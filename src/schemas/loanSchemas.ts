import { z } from "zod";

export const step1Schema = z.object({
  loanType: z.enum(["personal", "home", "business"], {
    message: "Please select loan type",
  }),
  loanAmount: z.string().min(1, "Loan amount is required"),
  loanTenure: z.string().min(1, "Loan tenure is required"),
  loanPurpose: z.string().min(1, "Loan purpose is required"),
  referralCode: z.string().optional(),
});

export type Step1FormValues = z.infer<typeof step1Schema>;

export const step2Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  fatherName: z.string().min(2, "Father name is required"),
  motherName: z.string().min(2, "Mother name is required"),
  email: z.string().email("Enter valid email"),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10 digit mobile number"),
  alternateMobile: z.string().optional(),
});

export type Step2FormValues = z.infer<typeof step2Schema>;

export const step3Schema = z.object({
  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter valid PAN format like ABCDE1234F"),
  aadhaarNumber: z
    .string()
    .regex(/^\d{12}$/, "Enter valid 12 digit Aadhaar number"),
  aadhaarConsent: z.literal(true, {
    message: "Aadhaar consent is required",
  }),
  voterId: z.string().optional(),
  passport: z.string().optional(),
});

export type Step3FormValues = z.infer<typeof step3Schema>;

export const step4Schema = z.object({
  currentAddressLine1: z.string().min(5, "Current address is required"),
  currentAddressLine2: z.string().optional(),
  pinCode: z.string().regex(/^\d{6}$/, "Enter valid 6 digit PIN code"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postOffice: z.string().optional(),
  residenceType: z.string().min(1, "Residence type is required"),
  rentAmount: z.string().optional(),
  yearsAtCurrentAddress: z.string().min(1, "Years at current address is required"),
  sameAsPermanent: z.boolean().optional(),
  permanentAddressLine1: z.string().optional(),
  permanentPinCode: z.string().optional(),
});

export type Step4FormValues = z.infer<typeof step4Schema>;

export const step5Schema = z.object({
  employmentType: z.string().min(1, "Employment type is required"),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  monthlySalary: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  annualTurnover: z.string().optional(),
  yearsInBusiness: z.string().optional(),
});

export type Step5FormValues = z.infer<typeof step5Schema>;

export const step6Schema = z.object({
  hasCoApplicant: z.string().min(1, "Please select co-applicant option"),
  coApplicantName: z.string().optional(),
  coApplicantRelation: z.string().optional(),
  coApplicantIncome: z.string().optional(),
  spouseName: z.string().optional(),
  numberOfDependents: z.string().min(1, "Number of dependents is required"),
});

export type Step6FormValues = z.infer<typeof step6Schema>;

export const step7Schema = z.object({});

export type Step7FormValues = z.infer<typeof step7Schema>;