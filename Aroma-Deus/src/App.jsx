// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Brands from "./pages/Brands.jsx";
import AddStaff from "./pages/AddStaff.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import UnAuthLayout from "./layouts/UnAuthLayout.jsx";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="perfume/:id" element={<Detail />} />
        <Route element={<UnAuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="brands" element={<Brands />} />
          <Route path="addstaff" element={<AddStaff />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
