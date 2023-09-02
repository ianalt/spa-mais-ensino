import { Role } from '../../../utils/enums/role.enum';

export interface EditProfileBody {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    cpf: string;
    birthDate: string;
    ethnicity?: Ethnicity;
    gender?: Gender;
    role: Role;
  };

  address: {
    id: number;
    cep: string;
    street: string;
    streetNumber: string;
    neighborhood: string;
    complement: string;
    city: string;
    uf?: Uf;
  };

  phoneNumbers: {
    id?: number;
    phoneNumber?: string;
  }[];

  educationInfoList?: {
    courseName?: string;
    institutionName: string;
    schoolingLevel: SchoolingLevelOption | null;
    startYear: string;
    conclusionYear: string | null;
  }[];

  financialInfo?: {
    id?: number;
    generalIncome: number;
    totalHouseHoldMembers: number;
  };
}
