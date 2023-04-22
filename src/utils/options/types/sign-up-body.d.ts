import { Ethnicity } from '../../enums/ethnicity.enum';
import { Gender } from '../../enums/gender.enum';
import { SchoolingLevel } from '../../enums/schooling-level.enum';

export interface SignUpBody {
  user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    cpf: string;
    birthDate: string;
    ethnicity: Ethnicity;
    gender: Gender;
  };

  address: {
    cep: string;
    street: string;
    streetNumber: string;
    neighborhood: string;
    complement: string;
    city: string;
    uf: Uf;
  };

  phoneNumbers: {
    phoneNumber: string;
  }[];

  educationInfo: {
    schoolingLevel: SchoolingLevel;
    courseName?: string | null;
    institutionName: string;
    startYear: string;
    conclusionYear?: string | null;
  };

  financialInfo: {
    generalIncome: number;
    totalHouseHoldMembers: number;
  };
}
