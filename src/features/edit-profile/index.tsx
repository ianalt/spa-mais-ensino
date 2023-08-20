import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getProfile,
  selectCurrentUser,
  selectUser,
} from '../../user/userSlice';

export default function EditProfilePage() {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <>
      <h1>Editar perfil</h1>

      {user.status === 'loading' ? (
        <div>carregando...</div>
      ) : (
        <div>{currentUser && currentUser.email}</div>
      )}
    </>
  );
}
