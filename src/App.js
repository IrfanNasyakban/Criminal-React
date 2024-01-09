/* eslint-disable no-unused-vars */
import {BrowserRouter, Routes, Route} from "react-router-dom"
import UserList from "./components/UserList";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Criminal from "./pages/Criminal";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddCriminal from "./pages/AddCriminal";
import EditCriminal from "./pages/EditCriminal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/add" element={<AddUser/>}/>
        <Route path="/users/edit/:id" element={<EditUser/>}/>
        <Route path="/criminal" element={<Criminal/>}/>
        <Route path="/criminal/add" element={<AddCriminal/>}/>
        <Route path="/criminal/edit/:id" element={<EditCriminal/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
