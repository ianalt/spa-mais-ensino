import { Role } from '../../../../../utils/enums/role.enum';
import { Address } from './address';
import { EducationInfo } from './education-info';
import { FinancialInfo } from './financial-info';
import { PhoneNumber } from './phone-number';

interface BasicSubjectInfo {
  id: number;
  name: string;
}

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  role: Role;
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
  subject: BasicSubjectInfo | null;
  //TODO questions and answers
  createdQuestions: any[];
  createdAnswers: any[];
}
