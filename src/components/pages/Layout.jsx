import '../../App.css';
import { Link, Outlet } from "react-router-dom";

export function Layout() {
    return (
      <>
        <nav>
          <ul>
            <li><Link to="/" className='App-link'>Forsíða</Link></li>
          </ul>
        </nav>
        <Outlet />
      </>
    );
}