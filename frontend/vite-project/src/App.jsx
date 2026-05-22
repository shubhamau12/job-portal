import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import JobDetails from "./pages/JobDetails";

// Admit Card Pages
import AddAdmitCard from "./pages/AddAdmitCard";
import AdmitCardList from "./pages/AdmitCardList";
import AdmitCardDetails from "./pages/AdmitCardDetails";

// Result Pages
import AddResult from "./pages/AddResult";
import ResultList from "./pages/ResultList";
import ResultDetails from "./pages/ResultDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <Home />
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            <Login />
          }
        />

        {/* Add/Edit Job */}
        <Route
          path="/admin"
          element={
            <Admin />
          }
        />

        {/* Job Details */}
        <Route
          path="/job/:id"
          element={
            <JobDetails />
          }
        />

        {/* Admit Card Routes */}
        <Route
          path="/add-admit-card"
          element={
            <AddAdmitCard />
          }
        />

        <Route
          path="/admit-cards"
          element={
            <AdmitCardList />
          }
        />

        <Route
          path="/admit-card/:id"
          element={
            <AdmitCardDetails />
          }
        />

        {/* Result Routes */}
        <Route
          path="/add-result"
          element={
            <AddResult />
          }
        />

        <Route
          path="/results"
          element={
            <ResultList />
          }
        />

        <Route
          path="/result/:id"
          element={
            <ResultDetails />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;