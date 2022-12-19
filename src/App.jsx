import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Navigation } from "./components/navigation";
import { About } from "./components/about";
import { Header } from "./components/header";
import { ImgWithMessage } from "./components/imgWithMessage";
import { Features } from "./components/features";
import { Services } from "./components/services";
import { CommentFb } from "./components/commentFb";
import { Footer } from "./components/footer";
import { HeroCarousel } from "./components/heroCarousel";
import { Counts } from "./components/counts";
import { OurServices } from "./components/ourServices";
import { Checkout } from "./components/checkout";
import { Cta } from "./components/cta";
import { CartShopping } from "./components/CartShopping";
import { Portfolio } from "./components/portfolio";
import { Team } from "./components/team";
import { Contact } from "./components/contact";
import { AttributesFull } from "./components/attributesFull";
import { AttributesWithImage } from "./components/attributesWithImage";
import TransferPay from "./components/transferPay";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { CartProvider } from "./context/CartProvider";
import { ProductDetails } from "./components/productDetails";
import "./main";
import ReactGA from "react-ga";

const Tracking_Id = "UA-241263230-1";
ReactGA.initialize(Tracking_Id);

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const paginas = [];

  for (const item of JsonData.pages) {
    //if (item.pageName === "Navigation") {
    //  {/*paginas.push({pagina: <Navigation/>, orden: item.order});*/ }
    //} else
    if (item.pageName === "Header") {
      paginas.push({ pagina: <Header data={item} />, orden: item.order });
    } else if (item.pageName === "About") {
      paginas.push({ pagina: <About data={item} />, orden: item.order });
    } else if (item.pageName === "Features") {
      paginas.push({ pagina: <Features data={item} />, orden: item.order });
    } else if (item.pageName === "Services") {
      paginas.push({ pagina: <Services data={item} />, orden: item.order });
    } else if (item.pageName === "CommentFb") {
      paginas.push({ pagina: <CommentFb data={item} />, orden: item.order });
    } else if (item.pageName === "Footer") {
      paginas.push({ pagina: <Footer data={item} />, orden: item.order });
    } else if (item.pageName === "HeroCarousel") {
      paginas.push({ pagina: <HeroCarousel data={item} />, orden: item.order });
    } else if (item.pageName === "Counts") {
      paginas.push({ pagina: <Counts data={item} />, orden: item.order });
    } else if (item.pageName === "OurServices") {
      paginas.push({ pagina: <OurServices data={item} />, orden: item.order });
    } else if (item.pageName === "Cta") {
      paginas.push({ pagina: <Cta data={item} />, orden: item.order });
    } else if (item.pageName === "Contact") {
      paginas.push({ pagina: <Contact data={item} />, orden: item.order });
    } else if (item.pageName === "Portfolio") {
      paginas.push({ pagina: <Portfolio data={item} />, orden: item.order });
    } else if (item.pageName === "Team") {
      paginas.push({ pagina: <Team data={item} />, orden: item.order });
    } else if (item.pageName === "ImgWithMessage") {
      paginas.push({
        pagina: <ImgWithMessage data={item} />,
        orden: item.order,
      });
    } else if (item.pageName === "AttributesFull") {
      paginas.push({
        pagina: <AttributesFull data={item} />,
        orden: item.order,
      });
    } else if (item.pageName === "AttributesWithImage") {
      paginas.push({
        pagina: <AttributesWithImage data={item} />,
        orden: item.order,
      });
    } else if (item.pageName === "CartShopping") {
      paginas.push({ pagina: <CartShopping data={item} />, orden: item.order });
    }
  }

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;
    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add("fixed-top");
        nextElement.classList.add("scrolled-offset");
      } else {
        selectHeader.classList.remove("fixed-top");
        nextElement.classList.remove("scrolled-offset");
      }
    };
    window.addEventListener("load", headerFixed);
    onscroll(document, headerFixed);
  }

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  return (
    <BrowserRouter>
      <CartProvider>
        {/* <div>{paginas.sort((a, b) => a.orden - b.orden).map((e) => e.pagina)}</div> */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {paginas.sort((a, b) => a.orden - b.orden).map((e) => e.pagina)}
              </div>
            }
          />
          <Route path="/checkout/" element={<Checkout />} />
          <Route path="/checkout/transfer" element={<TransferPay />} />
          <Route path="/productDetails" element={<ProductDetails />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
    /*
    
          
      <div>
        {
          paginas.sort((a, b) => a.orden - b.orden).map(e => e.pagina)
        }
      </div>
      */
  );
};

export default App;
