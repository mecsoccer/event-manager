import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { HashRouter, Switch, Redirect } from "react-router-dom";
import "./assets/styles/main.scss";
import Dashboard from './components/Dashboard';
import OnboardingLayout from './components/OnboardingLayout';
import { ROUTES } from './constants/routes';
import Home from './pages/dashboard/Home';
import Index from './pages/onboarding/Index';
import LoginPage from './pages/auth/Login';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path={[
              ROUTES.index,
            ]}
            exact
          >
            <OnboardingLayout>
              <Switch>
                <Route path={ROUTES.index} exact component={Index} />
              </Switch>
            </OnboardingLayout>
          </Route>
          <Route path={ROUTES.login} exact component={LoginPage} />
          <Route
            path={[ROUTES.dashboardHome]}
            exact
          >
            <Dashboard>
              <Switch>
                <Route path={ROUTES.dashboardHome} component={Home} />
              </Switch>
            </Dashboard>
          </Route>
          {/*<Route path="/" component={NotFoundPage} />*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
