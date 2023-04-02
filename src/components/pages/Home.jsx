import '../../App.css';
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="App">
            <header className="App-header">
              <h1>Kennsluskráin</h1>
              <p>Velkomin á þessa vefsíðu, hér fyrir neðan geturðu nálgast allar deildir á kennsluskrá</p>
              <Link to="/departments">Sjá allar deildir</Link>
            </header>
        </div>
    );
}

