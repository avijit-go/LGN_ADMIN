import React from "react";
import "./App.css"
import { Box, Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Authentication/ProtectRoute";

import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import BannerManagement from "./Pages/BannerManagement/BannerManagement";
import UserManagement from "./Pages/UserManagement/UserManagement";
import TournamentPage from "./Pages/TournamentManagement/TournamentPage.jsx";
import TourDetails from "./Pages/TournamentDetailsPage/TourDetails";
import Notification from "./Pages/Notification/Notification";
import SupportPage from "./Pages/SupportPage/SupportPage";
import { useSocket, socket } from "./socket/socket";


function App() {
  useSocket();
  
  return (
    <div className="app">
    <Routes>
      <Route path='/register' exact element={<Register />} />
        <Route path='/login' exact element={<Login />} />

        {/* Home page */}
        <Route
          path='/'
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Banner Management page */}
        <Route
          path='/banner'
          exact
          element={
            <ProtectedRoute>
              <BannerManagement />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* User Management page */}
        <Route
          path='/user'
          exact
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* Tournament Management page */}
        <Route
          path='/tournament'
          exact
          element={
            <ProtectedRoute>
              <TournamentPage />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* Tournament details Management page */}
        <Route
          path='/tournament-details/:id'
          exact
          element={
            <ProtectedRoute>
              <TourDetails />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* Notification Management page */}
        <Route
          path='/notification'
          exact
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* Support Management page */}
        <Route
          path='/support'
          exact
          element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* Create Banner page */}
        {/* <Route
          path='/create-banner'
          exact
          element={
            <ProtectedRoute>
              <CreateBanner />
            </ProtectedRoute>
          }
        /> */}
    </Routes>
    </div>
  );
}

export default App;
