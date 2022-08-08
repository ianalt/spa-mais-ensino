import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { selectUser } from "./user/userSlice";
import { useAppSelector } from "./app/hooks";
import { DefaultLayout } from "./layout/default.layout";
import { BlankLayout } from "./layout/blank.layout";
import { Counter } from "./features/counter/Counter";
import WelcomePage from "./features/welcome/WelcomePage";
import NotFoundPage from "./features/not-found/NotFoundPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* //TODO Sign In Page */}
      {/* <Route element={<WelcomePage />} path="/login" /> */}
      <Route element={<WelcomePage />} path="/" />

      {/* <Route
        element={
          <RequireAuth>
            <DefaultLayout />
          </RequireAuth>
        }
        path="/"
      > */}
      {/* <Route index element={<HomePage />} />
        <Route element={<Assessments />} path="/assessments" />
        <Route element={<Faq />} path="/faq" />
        <Route element={<Manage />} path="/manage" />
        <Route element={<DefaultLayout />} path="/default" /> */}
      {/* </Route> */}

      {/* <Route
        element={
          <RequireAuth>
            <BlankLayout />
          </RequireAuth>
        }
        path="/evaluation"
      >
        <Route index element={<Evaluation />} />
        <Route element={<EvaluationDo />} path="/evaluation/do" />
        <Route element={<EvaluationResults />} path="/evaluation/results" />
      </Route>

       */}
      <Route path="*" element={<NotFoundPage />}></Route>
      {/* <Route element={<Layout />}>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        />
      </Route> */}
    </Routes>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAppSelector(selectUser);
  let location = useLocation();

  if (!user.loggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
