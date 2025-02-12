import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css';
const Header = () => {
    return (
        <ul class="nav">
          <li className='logo'>
            <img></img>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/tasklists" aria-current="Tasks">My Task Lists</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/groups" aria-current="Groups">My Groups</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/create" aria-current="Create">Create</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">Account</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">Settings</Link>
          </li>
        </ul>
    );
  };
  export default Header;