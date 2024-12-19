import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTask from "./pages/EditTask";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
