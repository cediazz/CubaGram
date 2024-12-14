import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserPublication from "./Components/UserPublication/UserPublication";
import Login from "./Components/Login/Login";
import Users from "./Components/Users/Users";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import './App.css'
import { UserProvider } from "./utils/userContext";
import CreatePublication from "./Components/CreatePublication/CreatePublication";

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <div class="wrapper">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            {/* Routes with Sidebar and Navbar */}
            <Route
              path="/*" /* All Routes inside this Route */
              element={
                <>
                  <Navbar />
                  <Sidebar />
                  <div className="content-wrapper">
                    <section className="content">
                      <div className="container-fluid p-5">
                        <Routes>
                          <Route path="/" element={<UserPublication />} />
                          <Route path="/users" element={<Users />} />
                          <Route path="/profile/:id" element={<Profile />} />
                          <Route path="/create-publication" element={<CreatePublication />} />
                        </Routes>
                      </div>
                    </section>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
