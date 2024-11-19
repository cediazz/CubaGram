import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserPublication from "./Components/UserPublication/UserPublication";
import Login from "./Components/Login/Login";

function App() {
  return (
    <BrowserRouter>
    <div class="wrapper">
      <Routes>
          <Route path="/login" element={<Login />} />
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
                        <Route path="/users-publications" element={<UserPublication />} />
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
  );
}

export default App;
