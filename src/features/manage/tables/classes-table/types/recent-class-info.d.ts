import { BasicUserInfo } from '../../subjects-table/types/basic-user-info';
import { ClassCategory } from './classes';

export interface RecentClassInfo {
  id: number;

  createdAt: Date;

  updatedAt: Date;

  active: boolean;

  title: string;

  createdBy: BasicUserInfo;

  category: ClassCategory;
}
