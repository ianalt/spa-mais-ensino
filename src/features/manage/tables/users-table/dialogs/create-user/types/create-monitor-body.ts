import { Ethnicity } from '../../../../../../../utils/enums/ethnicity.enum';
import { Gender } from '../../../../../../../utils/enums/gender.enum';
import { Role } from '../../../../../../../utils/enums/role.enum';
import { Uf } from '../../../../../../../utils/enums/uf.enum';
import { EducationInfo } from './education-info';

//TODO IF MONITOR: address, phone, education
export interface CreateMonitorBody {
  user: {
    email: string;
    role?: Role;
    password: string;
    firstName: string;
    lastName: string;
    cpf: string;
    birthDate: string;
    ethnicity?: Ethnicity;
    gender?: Gender;
  };

  address: {
    cep: string;
    street: string;
    streetNumber: string;
    neighborhood: string;
    complement: string;
    city: string;
    uf?: Uf;
  };

  phoneNumbers: {
    phoneNumber: string;
  }[];

  educationInfoList: EducationInfo[];
}
