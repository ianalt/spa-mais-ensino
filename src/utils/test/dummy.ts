import { Ethnicity } from '../enums/ethnicity.enum';
import { Gender } from '../enums/gender.enum';
import { SchoolingLevel } from '../enums/schooling-level.enum';
import { SignUpBody } from '../options/types/sign-up-body';

export const testDummy: SignUpBody = {
  user: {
    email: 'ian.alt@email.com',
    password: 'Teste12aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa34*',
    firstName: 'TesteTaaaaaarês',
    lastName: 'Testado',
    cpf: '09853645726',
    birthDate: '2005--17',
    ethnicity: Ethnicity.BRANCA,
    gender: Gender.HOMEM_CIS,
  },
  address: {
    cep: '123407',
    street: 'Rua Nóbrega',
    streetNumber: '1789',
    neighborhood: 'Valparaíso',
    complement: 'Casa verde',
    city: 'Petrópolis',
    uf: 'RJ',
  },
  phoneNumbers: [
    {
      phoneNumber: '24912343647',
    },
  ],
  educationInfo: {
    schoolingLevel: SchoolingLevel.EMC,
    courseName: null,
    institutionName: 'Colégio Liceu',
    startYear: '2020',
    conclusionYear: '2022',
  },
  financialInfo: {
    generalIncome: 1000,
    totalHouseHoldMembers: 2,
  },
};
