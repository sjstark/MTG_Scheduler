import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainApp from './MainApp'
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import { Grid } from "@material-ui/core"

import ProjectsOverview from './components/Views/Projects/Overview'
import ProjectsDetails from './components/Views/Projects/Details'
import DepartmentsOverview from './components/Views/Departments'

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {authenticated
        ?
        <>
          <NavBar setAuthenticated={setAuthenticated} />
          <Header />
        </>
        :
        <></>
      }
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <ProtectedRoute path="/projects" exact authenticated={authenticated}>
          <div className="mainApp">
            <ProjectsOverview />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/projects/:projectId" authenticated={authenticated}>
          <div className="mainApp">
            <ProjectsDetails />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/departments" exact authenticated={authenticated}>
          <div className="mainApp">
            <DepartmentsOverview />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <Redirect to="/projects" />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
