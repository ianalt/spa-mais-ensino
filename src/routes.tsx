import isBefore from "date-fns/isBefore";
import jwt_decode from "jwt-decode";
import {
  Location,
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import HomePage from "./features/home";
import { Login } from "./features/login";
import ManagePage from "./features/manage";
import NotFoundPage from "./features/not-found/NotFoundPage";
import WelcomePage from "./features/welcome";
import { DefaultLayout } from "./layout/default.layout";
import { WelcomeLayout } from "./layout/welcome.layout";
import { login as reduxLogin, logout, selectUser } from "./user/userSlice";

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
            <Login />
          </CheckLogin>
        }
        path="/login"
      ></Route>

      <Route
        element={
          <RequireAuth>
            <DefaultLayout />
          </RequireAuth>
        }
        path="/mais-ensino"
      >
        <Route index element={<HomePage />} />
        <Route element={<ManagePage />} path="/mais-ensino/gerenciamento" />
      </Route>

      <Route element={<DefaultLayout />} path="/default"></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

const CheckLogin = ({ children }: { children: JSX.Element }) => {
  let location: Location = useLocation();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  let [searchParams] = useSearchParams();

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
        role: "usuario" | "aluno" | "monitor" | "professor" | "admin";
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

  if (!user.loggedIn || user.role === "usuario") {
    return (
      <Navigate
        // to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        to={`/`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
