export interface Case {
  id: number;
  title: string;
  shortDescription: string;
  age: number;
  gender: string;
  medicalHistory: string;
  symptoms: string[];
  correctDiagnosis: string;
  explanation: string;
  field: string;
  status: string; // Added the status field (e.g., "pending" or "completed")
}

export interface MedicalField {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl: string;
}
