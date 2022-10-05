import RoutesList from "./routes/RoutesList";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <RoutesList />
      </Router>
    </div>
  );
}

export default App;
