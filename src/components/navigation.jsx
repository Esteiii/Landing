export const Navigation = (props) => {
  const pagesDefinition = require("../data/data.json");

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            <h6>
              <img
                className="img"
                src={pagesDefinition.logoNav}
                alt="Imagen Logo"
              />
              {pagesDefinition.titleNav}
            </h6>
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {pagesDefinition.pages
              .filter((d) => (d.showInMenu ?? true) === true)
              .map((d, i) => (
                <li key={`${d.title}-${i}`}>
                  <a href={`${d.href}`} className="page-scroll">
                    {d.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
