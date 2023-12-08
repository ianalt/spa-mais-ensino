import isBefore from 'date-fns/isBefore';
import jwt_decode from 'jwt-decode';
import {
  Location,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import HomePage from './features/home';
import { Login } from './features/login';
import ManagePage from './features/manage';
import NotFoundPage from './features/not-found/NotFoundPage';
import ProfilePage from './features/profile';
import SignUp from './features/sign-up';
import WelcomePage from './features/welcome';
import { DefaultLayout } from './layout/default.layout';
import { WelcomeLayout } from './layout/welcome.layout';
import { login as reduxLogin, selectUser } from './user/userSlice';
import { Role } from './utils/enums/role.enum';
import MySubjectPage from './features/my-subject';
import CreateClassPage from './features/create-class';
import ClassPage from './features/access-class';
import SubjectPage from './features/access-subject';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <CheckLogin>
            <WelcomeLayout />
          </CheckLogin>
        }
      >
        <Route path="/" element={<WelcomePage />} />
      </Route>

      <Route
        element={
          <CheckLogin>
            <SignUp />
          </CheckLogin>
        }
        path="/cadastro"
      />

      <Route
        element={
          <CheckLogin>
            <Login />
          </CheckLogin>
        }
        path="/login"
      />

      <Route
        element={
          <RequireAuth>
            <DefaultLayout />
          </RequireAuth>
        }
        path="/mais-ensino"
      >
        <Route
          index
          element={
            <RequireRole roles={[Role.PROFESSOR, Role.ADMIN, Role.ESTUDANTE]}>
              <HomePage />
            </RequireRole>
          }
        />

        <Route
          element={
            <RequireRole roles={[Role.PROFESSOR]}>
              <MySubjectPage />
            </RequireRole>
          }
          path="/mais-ensino/minha-disciplina"
        />

        <Route
          element={
            <RequireRole roles={[Role.PROFESSOR]}>
              <CreateClassPage />
            </RequireRole>
          }
          path="/mais-ensino/minha-disciplina/nova-aula"
        />

        <Route
          element={
            <RequireRole roles={[Role.ADMIN]}>
              <ManagePage />
            </RequireRole>
          }
          path="/mais-ensino/gerenciamento"
        />

        <Route
          element={
            <RequireRole roles={[Role.ADMIN]}>
              <CreateClassPage />
            </RequireRole>
          }
          path="/mais-ensino/gerenciamento/nova-aula"
        />

        <Route
          element={
            <RequireRole roles={[Role.ADMIN, Role.PROFESSOR, Role.ESTUDANTE]}>
              <SubjectPage />
            </RequireRole>
          }
          path="/mais-ensino/disciplina/:subjectId"
        />

        <Route
          element={
            <RequireRole roles={[Role.ADMIN, Role.PROFESSOR, Role.ESTUDANTE]}>
              <ClassPage />
            </RequireRole>
          }
          path="/mais-ensino/aula/:classId"
        />

        <Route
          element={
            <RequireRole roles={[Role.ADMIN, Role.PROFESSOR, Role.ESTUDANTE]}>
              <ProfilePage />
            </RequireRole>
          }
          path="/mais-ensino/meu-perfil"
        />
      </Route>

      <Route element={<DefaultLayout />} path="/default" />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const RequireRole = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: Role[];
}) => {
  const user = useAppSelector(selectUser);
  let location = useLocation();

  if (user.role === Role.USUARIO) return <Navigate to="/" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/mais-ensino" state={{ from: location }} replace />;
  }

  return children;
};

const CheckLogin = ({ children }: { children: JSX.Element }) => {
  let location: Location = useLocation();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  if (user.loggedIn)
    return <Navigate to={`/mais-ensino`} state={{ from: location }} replace />;

  const sdnToken = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME!);

  if (sdnToken) {
    try {
      const {
        exp,
        sub,
        email,
        role,
      }: {
        exp: number;
        sub: number;
        email: string;
        role: Role;
      } = jwt_decode(sdnToken);
      const currentDate = new Date();
      const expDate = new Date(exp * 1000);

      if (isBefore(currentDate, expDate)) {
        dispatch(
          reduxLogin({
            id: sub,
            role: role,
            email: email,
          })
        );
      } else {
        localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME!);
        return <Navigate to="/" state={{ from: location }} replace />;
      }
    } catch (e) {
      localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME!);
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return children;
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAppSelector(selectUser);
  let location = useLocation();

  if (!user.loggedIn || user.role === Role.USUARIO) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
