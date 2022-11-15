import React, { useState } from "react";
import RoutesList from "./routes/RoutesList";
import { ThemeContext } from "./components/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState('bg-regal-blue');

  return (
    <div className="App">
      <Router>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <RoutesList />
        </ThemeContext.Provider>
      </Router>
    </div>
  );
}

export default App;
