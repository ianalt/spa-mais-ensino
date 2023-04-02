import { Address } from "./address";
import { EducationInfo } from "./education-info";
import { FinancialInfo } from "./financial-info";
import { PhoneNumber } from "./phone-number";

export interface User {
  id: number;
  role: "estudante" | "monitor" | "professor" | "admin";
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  birthDate: Date;
  ethnicity: string;
  gender: string;
  address: Address;
  financialInfo: FinancialInfo;
  phoneNumbers: PhoneNumber[];
  educationInfoList: EducationInfo[];
  comments: any[];
  subject: any;
}
