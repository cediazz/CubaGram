import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserPublication from "./Components/UserPublication/UserPublication";

function App() {
  return (
    <BrowserRouter>
    <div class="wrapper">
      <Navbar />
      <Sidebar />
      <div class="content-wrapper">
        <section class="content">
          <div class="container-fluid p-5">
          <Routes>
                <Route path="/users-publications" element={<UserPublication />} />
                
          </Routes>
         </div>
        </section>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
