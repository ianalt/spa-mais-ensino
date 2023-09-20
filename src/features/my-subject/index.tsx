import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getProfile, selectUser } from '../../user/userSlice';
import { useEffect } from 'react';
import MySubjectPageContent from './MySubjectContent';

export default function MySubjectPage() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  const { profile } = currentUser;

  useEffect(() => {
    document.title = '+Ensino: Minha disciplina';

    dispatch(getProfile());
  }, []);

  return (
    <>
      <MySubjectPageContent />
    </>
  );
}
