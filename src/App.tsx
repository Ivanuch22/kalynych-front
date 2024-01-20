import React from "react";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import routes from "./routes";

import {
  AdminPage,
  AdminPageConciergUser,
  CVPage,
  ConceirgePage,
  ConciergDashBoard,
  ConciergePageUserData,
  IdeasPage,
  JobDescriptionPage,
  MainPage,
  OneCVPage,
  OneCoverLetterPage,
  ProfilePage,
  UserFindJobsPage,
  UserProfile,
  UsersPage,
} from "./pages";

import { PrivateRoutes } from "./guard";
import { Layout } from "./components";
import Auth from "./components/Auth/Auth";
import { ResetPassword } from "./components/Auth/ResetPassword";
import { OneJobDescriptionPage } from "./pages/OneJobDescription";
import ConciergUserJobsPage from "./pages/ConciergUserJobsPage/ConciergUserJobsPage";

import "./App.module.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />} path={routes.index}>
          <Route element={<MainPage />} path={routes.index} />
          <Route element={<CVPage />} path={routes.cv} />
          <Route element={<OneCVPage />} path={`${routes.cvById}:id`} />
          <Route
            element={<OneCoverLetterPage />}
            path={`${routes.coverLetterByIdPage}:id`}
          />
          <Route element={<IdeasPage />} path={routes.ideasPage} />
          <Route
            element={<JobDescriptionPage />}
            path={routes.jobsDescriptions}
          />

          <Route
            element={<OneJobDescriptionPage />}
            path={`${routes.jobsDescriptions}/:id`}
          />

          <Route element={<ConceirgePage />} path={routes.conceirgePage} />
          <Route
            element={<ConciergePageUserData />}
            path={`${routes.conceirgePageUserData}:id`}
          />
          <Route element={<ConciergUserJobsPage />} path={routes.userJobs} />
          <Route
            element={<ConciergDashBoard />}
            path={routes.conciergDashBoard}
          />

          <Route element={<AdminPage />} path={routes.adminPage} />
          <Route element={<UsersPage />} path={routes.usersPage} />
          <Route element={<ProfilePage />} path={`${routes.userProfile}:id`} />

          <Route
            element={<AdminPageConciergUser />}
            path={`${routes.conceirgePageUsers}:id`}
          />

          <Route element={<UserFindJobsPage />} path={routes.userFindJob} />

          <Route
            element={<UserProfile />}
            path={`${routes.userProfileSettings}:id`}
          />
        </Route>
      </Route>
      <Route element={<Auth />} path={routes.auth} />
      <Route element={<ResetPassword />} path={routes.resetPassword} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
