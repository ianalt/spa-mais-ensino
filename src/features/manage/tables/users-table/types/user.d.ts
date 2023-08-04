import { Address } from './address';
import { EducationInfo } from './education-info';
import { FinancialInfo } from './financial-info';
import { PhoneNumber } from './phone-number';

interface BasicSubjectInfo {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  active: boolean;
  role: 'estudante' | 'monitor' | 'professor' | 'admin';
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
  subject: BasicSubjectInfo | null;
}
