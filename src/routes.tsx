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
import { Login } from "./features/login";
import NotFoundPage from "./features/not-found/NotFoundPage";
import HomePage from "./features/home";
import { DefaultLayout } from "./layout/default.layout";
import { login as reduxLogin, selectUser } from "./user/userSlice";
import StudentPage from "./features/student";
import MonitorPage from "./features/monitor";
import TeacherPage from "./features/teacher";
import AdminPage from "./features/admin";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
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
        <Route index element={<AdminPage />} />
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

        if (user.loggedIn)
          return (
            <Navigate
              //TODO check user role so it can be redirected
              to={searchParams.get("redirect") || `/mais-ensino/${user.role}`}
              state={{ from: location }}
              replace
            />
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
        to={`/?redirect=${encodeURIComponent(location.pathname)}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
