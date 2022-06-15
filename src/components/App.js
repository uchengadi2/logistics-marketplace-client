import React, { useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import history from "./../history";
import theme from "./ui/Theme";
import Dashboard from "./Dashboard/Dashboard";
import Preferences from "./Preferences/Preferences";
import useToken from "../custom-hooks/useToken";
import UserLogin from "./users/UserLogin";
import Header from "./ui/Header";
import IndexDashboard from "./IndexDashboard";
import CategoryLayout from "./ui/CategoryLayout";
import VendorLayout from "./ui/VendorLayout";
import ProductLayout from "./ui/ProductLayout";
import CityLayout from "./ui/CityLayout";
import UsersLayout from "./ui/UsersLayout";
import OrdersLayout from "./ui/OrdersLayout";
import PaymentLayout from "./ui/PaymentLayout";
import RemittanceLayout from "./ui/RemittanceLayout";
import ReportsLayout from "./ui/ReportsLayout";
import PoliciesLayout from "./ui/PoliciesLayout";
import UtilitiesLayout from "./ui/UtilitiesLayout";
import TripsLayout from "./ui/TripLayout";

function App() {
  const { token, setToken } = useToken();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  if (!token) {
    return <UserLogin setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Header
            value={value}
            setValue={setValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          ;
          <Switch>
            <Route exact path="/">
              <CategoryLayout token={token} />
            </Route>
            <Route path="/categories">
              <CategoryLayout token={token} />
            </Route>
            <Route path="/vendors">
              <VendorLayout token={token} />
            </Route>
            <Route path="/products">
              <ProductLayout token={token} />
            </Route>
            <Route path="/cities">
              <CityLayout token={token} />
            </Route>
            <Route path="/users">
              <UsersLayout token={token} />
            </Route>
            <Route path="/orders">
              <OrdersLayout token={token} />
            </Route>
            <Route path="/trips">
              <TripsLayout token={token} />
            </Route>
            <Route path="/payments">
              <PaymentLayout token={token} />
            </Route>
            <Route path="/remittances">
              <RemittanceLayout token={token} />
            </Route>
            <Route path="/utilities">
              <UtilitiesLayout token={token} />
            </Route>
            <Route path="/policies">
              <PoliciesLayout token={token} />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
