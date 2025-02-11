import './globals.css';
const Header = () => {
    return (
      <header id="nav">
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Jello</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">My Task Lists</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">My Groups</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Create</a>
            </li>
          </ul>
          </div>
          </div>
        </nav>
      </header>
    );
  };
  export default Header;
  {/* <h1 id="head1">LOGO</h1>
  <p id="brk1"></p>
  <h1 id="head2">My Task Lists</h1>
  <p id="brk2"></p>
  <h1 id="head3">My Groups</h1>
  <p id="brk3"></p>
  <h1 id="head4">Create</h1>
  <p id="brk4"></p>
  <h1 id="head5">Account</h1>
  <p id="brk5"></p>
  <h1 id="head6">Settings</h1> */}