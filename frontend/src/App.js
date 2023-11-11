import "./styles/shared-styles.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  MDBContainer,

} from "mdb-react-ui-kit";
import Login from "./components/login.component";
import Register from "./components/register.component"
import UserInfo from "./components/user-info.component";
import CreatePlan from "./components/create-plan.component";
import MyInterestedPlans from "./components/my-interested-plans.component";
import MyPlans from "./components/my-plans.component";
import UpdatePersonalData from "./components/create-plan.component";
import { AuthProvider } from "./Contexts/AuthContext";
import { useAuth } from "./Contexts/AuthContext";
import MainPage from "./components/main-page.component";
import Header from "./components/header.component";
import Footer from "./components/footer.component";



function App() {
  const [showBasic, setShowBasic] = useState(false);
  

  

  return (

    <>
    <AuthProvider>
      
      <Header> </Header>

      <MDBContainer fluid className="pt-5">
        <Routes>
          <Route exact path="/" element={<MainPage />} />

          <Route
            exact
            path="/login"
            element={<Login />}
          />
          <Route
            exact
            path="/register"
            element={<Register />}
          />
          <Route
            exact
            path="/user-info"
            element={<UserInfo />}
          />
          <Route
            exact
            path="/create-plan"
            element={<CreatePlan />}
          />
          <Route
            exact
            path="/my-interested-plans"
            element={<MyInterestedPlans />}
          />
          <Route
            exact
            path="/my-plans"
            element={<MyPlans />}
          />
          <Route
            exact
            path="/update-personal-data"
            element={<UpdatePersonalData />}
          />

          <Route
            exact
            path="/main-page"
            element={<MainPage />}
          />
        </Routes>
      </MDBContainer>

      <Footer></Footer>
      
      
    </AuthProvider>
    </>
  );
}

export default App;
