export interface SignUpBody {
  user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    cpf: string;
    //TODO change to Date later
    birthDate: Date;
    ethnicity: string;
    gender: string;
  };

  address: {
    cep: string;
    street: string;
    streetNumber: string;
    neighborhood: string;
    complement: string;
    city: string;
    state: string;
  };

  phoneNumbers: {
    phoneNumber: string;
  }[];

  educationInfo: {
    schoolingLevel: string;
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
