export const Header = (props) => {
  const pagesDefinition = require("../data/data.json");
  return (
    <header
      id={props.data ? props.data.href.substring(1, props.data.href.len) : ""}
      class="d-flex align-items-center"
    >
      <div class="container d-flex align-items-center justify-content-between">
        <div class="logo">
          <h1 class="text-light">
            <a href="/">
              <span>
                <img
                  className="img"
                  src={props.data ? props.data.data.logoNav : ""}
                  alt="Imagen Logo"
                />
                {props.data ? props.data.data.title : ""}
              </span>
            </a>
          </h1>
        </div>
        <nav id="navbar" class="navbar">
          <ul>
            {pagesDefinition.pages
              .filter((d) => d.showInMenu === true)
              .map((d, i) => (
                <li key={`${d.title}-${i}`}>
                  <a
                    class="nav-link scrollto active"
                    data-toggle="collapse"
                    className="nav-link collapsed"
                    href={`${
                      d.href.substring(0, 1) === "#" ? "/" + d.href : d.href
                    }`}
                  >
                    {d.title}
                  </a>
                </li>
              ))}
            {/*<li><a class="nav-link scrollto " href="#hero">Home</a></li>
      <li><a class="nav-link scrollto" href="#about">About Us</a></li>
      <li><a class="nav-link scrollto" href="#services">Services</a></li>
      <li><a class="nav-link scrollto" href="#portfolio">Portfolio</a></li>
      <li><a class="nav-link scrollto" href="#team">Team</a></li>
      <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
        <ul>
          <li><a href="#">Drop Down 1</a></li>
          <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
            <ul>
              <li><a href="#">Deep Drop Down 1</a></li>
              <li><a href="#">Deep Drop Down 2</a></li>
              <li><a href="#">Deep Drop Down 3</a></li>
              <li><a href="#">Deep Drop Down 4</a></li>
              <li><a href="#">Deep Drop Down 5</a></li>
            </ul>
          </li>
          <li><a href="#">Drop Down 2</a></li>
          <li><a href="#">Drop Down 3</a></li>
          <li><a href="#">Drop Down 4</a></li>
        </ul>
      </li>
          <li><a class="nav-link scrollto" href="#contact">Contact</a></li>*/}
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};
