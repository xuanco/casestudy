import './App.css'
import {Route, Routes} from "react-router";
import Dashboard from "./pages/Dashboard/index.jsx";
import Master from "./components/Admin/Layout/Master.jsx";
import BookList from "./pages/Books/BookList/index.jsx";
import SignIn from "./pages/Login/index.jsx";

function App() {
  return (
    <>
       <Routes>
           <Route path="/login" element={<SignIn />} />
           <Route path="/admin" element={<Master/>}>
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="books" element={<BookList />} />
           </Route>
       </Routes>
    </>
  )
}

export default App
