export interface UpdateAdminBody {
  userId: number;

  user: {
    email: string;
    firstName: string;
    lastName: string;
    cpf: string;
    birthDate: string;
    ethnicity?: Ethnicity;
    gender?: Gender;
    active?: boolean;
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
}
