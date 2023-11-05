export interface CreateClassBody {
  title: string;
  categoryId: number;
  videoClassFile: File | null;
  extraFiles: FileList | null;
}
