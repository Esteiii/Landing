import { useState, useEffect } from "react";
import { SimpleraMesage } from "../custom/simplera/js/simpleraJs";
import { Loading } from "./loading";
import ReactGA from "react-ga";

const simpleraMessageContent = {
  name: "",
  email: "",
  message: "",
};

export const Footer = (props) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  const [{ name, email, message }, setState] = useState(simpleraMessageContent);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  //const clearState = () => setState({ ...simpleraMessageContent })

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    ReactGA.event({
      category: "Correo enviado",
      action: "mensaje action",
      label: "mensaje label",
    });
    SimpleraMesage.send(props.data.orgId, email, name, message).then(
      (result) => {
        alert(props.data.data.sendOkMessage);
        setIsLoading(false);
        //clearState()
      },
      (error) => {
        alert(`Error al enviar el mensaje: ${error}`);
        setIsLoading(false);
        console.log(error);
      }
    );
  };
  if (props.data === undefined) {
    return <div></div>;
  }
  return (
    <footer
      id={props.data ? props.data.href.substring(1, props.data.href.len) : ""}
      className="containerBack"
    >
      {isLoading && <Loading />}
      <div className="col-md-12 containerBack">
        <div className="row">
          <div className="social">
            <div className="footer-top">
              <div className="container">
                <div class="row">
                  <div className="col-lg-3 col-md-6 footer-info">
                    <h2>{props.data ? props.data.data.titleContact : ""}</h2>
                    <p>
                      {props.data ? props.data.data.address : ""}
                      <br></br>
                      {props.data ? props.data.data.phone : ""}
                      <br></br>
                      {props.data ? props.data.data.email : ""}
                      <br></br>
                    </p>
                    <div class="social-links mt-3">
                      {props.data.data.linkedin === "" ? (
                        ""
                      ) : (
                        <a
                          class="linkedin"
                          href={props.data ? props.data.data.linkedin : ""}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="bx bxl-linkedin"></i>
                        </a>
                      )}
                      {props.data.data.github === "" ? (
                        ""
                      ) : (
                        <a
                          class="github"
                          href={props.data ? props.data.data.github : ""}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="bx bxl-github"></i>
                        </a>
                      )}
                      {props.data.data.instagram === "" ? (
                        ""
                      ) : (
                        <a
                          class="instagram"
                          href={props.data ? props.data.data.instagram : ""}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="bx bxl-instagram"></i>
                        </a>
                      )}
                      {props.data.data.whatsapp === "" ? (
                        ""
                      ) : (
                        <a
                          class="whatsapp"
                          href={props.data ? props.data.data.whatsapp : ""}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="bx bxl-whatsapp"></i>
                        </a>
                      )}
                      {props.data.data.twitter === "" ? (
                        ""
                      ) : (
                        <a
                          class="twitter"
                          href={props.data ? props.data.data.twitter : ""}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="bx bxl-twitter"></i>
                        </a>
                      )}

                      {props.data.data.facebook === "" ? (
                        ""
                      ) : (
                        <a
                          class="facebook"
                          href={props.data ? props.data.data.facebook : ""}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="bx bxl-facebook"></i>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 footer-newsletter">
                    <h2>{props.data ? props.data.data.title : ""}</h2>
                    <p>{props.data ? props.data.data.paragraph : ""}</p>
                    <form name="sentMessage" validate onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                              placeholder="Nombre"
                              required
                              onChange={handleChange}
                            />
                            <p className="help-block text-danger"></p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Email"
                              required
                              onChange={handleChange}
                            />
                            <p className="help-block text-danger"></p>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          rows="4"
                          placeholder="Mensaje"
                          required
                          onChange={handleChange}
                        ></textarea>
                        <p className="help-block text-danger"></p>
                      </div>
                      <div id="success"></div>
                      <button type="submit" className="btn">
                        {props.data ? props.data.data.buttonTitle : ""}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="copyright">
            &copy; {props.data ? props.data.data.textDesignBy : ""}{" "}
            <a
              className="textLink"
              href={props.data ? props.data.data.designByUrl : ""}
              target="_blank"
              rel="noreferrer"
            >
              {props.data.data.designByName}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
