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
import WelcomePage from "./features/welcome/WelcomePage";
import { DefaultLayout } from "./layout/default.layout";
import { login as reduxLogin, selectUser } from "./user/userSlice";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<WelcomePage />}></Route>
      </Route>

      <Route
        element={
          <CheckLogin>
            <Login />
          </CheckLogin>
        }
        path="/login"
      ></Route>

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
    return (
      <Navigate
        to={searchParams.get("redirect") || "/"}
        state={{ from: location }}
        replace
      />
    );

  const sdnToken = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME!);

  if (sdnToken) {
    try {
      const { exp, sub, email }: { exp: number; sub: number; email: string } =
        jwt_decode(sdnToken);
      const currentDate = new Date();
      const expDate = new Date(exp * 1000);

      if (isBefore(currentDate, expDate)) {
        dispatch(
          reduxLogin({
            id: sub,
            role: "aluno",
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
    return <Navigate to={`/`} state={{ from: location }} replace />;
  }

  return children;
}
