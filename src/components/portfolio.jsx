import React, { useState, useEffect, useCallback } from "react";
/*
import {
  Row,
  Col,
} from "reactstrap";
*/
import { useCart } from "../hook/useCart";
import useEmblaCarousel from "embla-carousel-react";
import Carousel from "react-bootstrap/Carousel";

//import EmblaCarousel from "./carousel/js/EmblaCarousel";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
//import "../components/carousel/css/base.css";
//import "../components/carousel/css/reset.css";

export const Portfolio = (props) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );
  const { cart, setCart } = useCart();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("*");
  const [currentPage, setCurrentPage] = useState(0);
  const currency = function (number) {
    return new Intl.NumberFormat("de-DE").format(number);
  };

  const handleFilter = (e) => {
    if (e.target.value.toString() === "0") {
      setFilter("*");
      setCurrentPage(0);
    } else {
      setFilter(category[e.target.value - 1].categoryId);
      setCurrentPage(0);
    }
  };

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  const DotButton = ({ selected, onClick }) => (
    <button
      className={`embla__dot ${selected ? "is-selected" : ""}`}
      type="button"
      onClick={onClick}
    />
  );

  const PrevButton = ({ enabled, onClick }) => (
    <button
      className="embla__button embla__button--prev"
      onClick={onClick}
      disabled={!enabled}
    >
      <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
        <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
      </svg>
    </button>
  );

  const NextButton = ({ enabled, onClick }) => (
    <button
      className="embla__button embla__button--next"
      onClick={onClick}
      disabled={!enabled}
    >
      <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
        <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
      </svg>
    </button>
  );

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  const handleSubmit = (e, product) => {
    e.preventDefault();
    const productoSeleccionado = {
      productId: product.id,
      productName: product.title,
      productImg: product.image[0],
      productPrice: product.productPriceNew,
      productQuantity: 1,
    };

    const existe = cart?.some(
      (product) => product.productId === productoSeleccionado.productId
    );

    if (existe) {
      const product = cart?.map((product) => {
        if (product.productId === productoSeleccionado.productId) {
          product.productQuantity += 1;
          return product;
        } else {
          return product;
        }
      });

      setCart([...product]);
      localStorage.setItem("cart", JSON.stringify(product ?? ""));
    } else {
      setCart([...(cart ?? []), productoSeleccionado]);
      localStorage.setItem("cart", JSON.stringify(cart ?? ""));
    }
  };

  const onChangeInput = (event) => {
    setSearch(event.target.value);
    setCurrentPage(0);
  };
  //METODO DE FILTRADO
  let results = [];

  let products = require(`../data/${props.data.data.pathProducts}`);
  let category = require(`../data/${props.data.data.pathCategories}`);
  //Metodo de Paginado
  const filteredProducts = () => {
    if (search.length === 0 && filter === "*") {
      results = products.slice(
        currentPage,
        currentPage + props.data.data.numberOfProductsShow
      );
      return results;
    } else if (filter !== "*" && search.length === 0) {
      results = products.filter((product) =>
        product.category.toLowerCase().includes(filter.toLocaleLowerCase())
      );
      results = results.slice(
        currentPage,
        currentPage + props.data.data.numberOfProductsShow
      );
      return results;
    } else if (search.length > 0 && filter !== "*") {
      results = products.filter((product) =>
        product.category.toLowerCase().includes(filter.toLocaleLowerCase())
      );
      results = results.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
          product.productDescription
            .toLowerCase()
            .includes(search.toLocaleLowerCase())
      );
      results = results.slice(
        currentPage,
        currentPage + props.data.data.numberOfProductsShow
      );

      return results;
    } else {
      results = products.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
          product.productDescription
            .toLowerCase()
            .includes(search.toLocaleLowerCase())
      );
      results = results.slice(
        currentPage,
        currentPage + props.data.data.numberOfProductsShow
      );
      return results;
    }
  };
  const nextPage = () => {
    if (
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
          product.productDescription
            .toLowerCase()
            .includes(search.toLocaleLowerCase())
      ).length >
      currentPage + 4
    ) {
      setCurrentPage(currentPage + 4);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 4);
    }
  };

  /* if(filter==='*'){
    results= products;
  }else{
    results = products.filter( (product) => product.category.toLowerCase().includes(filter.toLocaleLowerCase()) )
  }

  if(search){
    results = results.filter( (product) => product.title.toLowerCase().includes(search.toLocaleLowerCase()) || product.productDescription.toLowerCase().includes(search.toLocaleLowerCase()) )
  } */

  const [index, setIndex] = useState(1);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const product = require("../data/products.json");

  return (
    <section
      id={props.data ? props.data.href.substring(1, props.data.href.len) : ""}
      class="portfolio section-bg"
    >
      <div class="container" id="productos" style={{ minHeight: "300px" }}>
        {/* <div class="section-title">
          <h2>{props.data ? props.data.data.title : ""}</h2>
          <p>{props.data ? props.data.data.paragraph : ""}</p>
        </div>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {product.map((d, i) => (
            <Carousel.Item>
              <div class={`portfolio-item`}>
                <div
                  key={`${d.title}-${i}`}
                  class={`portfolio-wrap`}
                  style={{
                    alignContent: "center",
                  }}
                >
                  <div
                    className="product-img position-relative"
                    style={{ alignContent: "center", display: "block" }}
                  >
                    {d.featuredArticle ? (
                      <div className="avatar-sm product-ribbon-featured">
                        <div className="avatar-title-featured rounded-circle">
                          <i className="bx bx-star icon-color-featured" />
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                    {d.productPriceNew < d.productPrice &&
                    d.productPriceNew > 0 ? (
                      <div className="avatar-sm product-ribbon-offer">
                        <span className="avatar-title rounded-circle">
                          {` ${
                            (d.productPriceNew * 100) / d.productPrice - 100
                          }%`}
                        </span>
                      </div>
                    ) : (
                      <div />
                    )}
                    <div>
                      <img
                        class="portfolio-item-img"
                        width="300px"
                        height="300px"
                        alt={d.title}
                        src={d.image[0]}
                      />
                    </div>
                  </div>

                  <div class="portfolio-info">
                    <h4>{d.title}</h4>
                    <p
                      dangerouslySetInnerHTML={{ __html: d.productDescription }}
                    />
                  </div>
                  <div class="portfolio-links">
                    <Popup
                      trigger={
                        <Link
                          to={`/productDetails?productID=${d.id}`}
                          class="bx bx-info-circle"
                          style={{ cursor: "pointer" }}
                        ></Link>
                      }
                      modal
                    >
                      {(close) => (
                        <div class="card" style={{ background: "#eee" }}>
                          <div>
                            <p></p>
                          </div>
                          <div>
                            <p></p>
                          </div>
                          <div className="embla">
                            <div className="embla__viewport" ref={viewportRef}>
                              <div className="embla__container">
                                {d.image.map((image, index) => (
                                  <div className="embla__slide" key={index}>
                                    <div className="embla__slide__inner">
                                      <img
                                        className="embla__slide__img"
                                        src={image}
                                        alt={d.title}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/*<PrevButton
                              onClick={scrollPrev}
                              enabled={prevBtnEnabled}
                            />
                            <NextButton
                              onClick={scrollNext}
                              enabled={nextBtnEnabled}
                                />
                          </div>
                          <div className="embla__dots">
                            {scrollSnaps.map((_, index) => (
                              <DotButton
                                key={index}
                                selected={index === selectedIndex}
                                onClick={() => scrollTo(index)}
                              />
                            ))}
                          </div>

                          <div className="text-container-popup">
                            <h3>{d.title}</h3>
                            <h5>
                              {d.productPriceNew > 0 &&
                              d.productPriceNew < d.productPrice ? (
                                <div>
                                  <span className="text-muted me-2">
                                    <del>${currency(d.productPrice)}</del>
                                  </span>
                                  <b class="price">
                                    ${currency(d.productPriceNew)}
                                  </b>
                                </div>
                              ) : (
                                <div>
                                  <b class="price">
                                    ${currency(d.productPrice)}
                                  </b>
                                </div>
                              )}
                            </h5>
                            <p
                              style={{ fontSize: "14px" }}
                              dangerouslySetInnerHTML={{
                                __html: d.productDescription,
                              }}
                            />
                          </div>
                          <div class="row">
                            <div
                              class="col-lg-1"
                              style={{ paddingRight: "0" }}
                            ></div>
                            <div class="col-lg-4" style={{ paddingRight: "0" }}>
                              <button
                                onClick={() => close()}
                                className="portfolio-return-button"
                                style={{
                                  width: "100%",
                                  border: "none",
                                  height: "30px",
                                }}
                              >
                                <i className="bx bx-arrow-back" /> {"Volver"}
                              </button>
                            </div>
                            <div
                              class="col-lg-2"
                              style={{ paddingRight: "0" }}
                            ></div>
                            <div
                              class="col-lg-4"
                              style={{
                                paddingLeft: "0",
                              }}
                            >
                              <button
                                class="portfolio-add-button"
                                style={{
                                  width: "100%",
                                  border: "none",
                                  height: "30px",
                                }}
                                onClick={(e) => {
                                  handleSubmit(e, d);
                                  close();
                                }}
                              >
                                <i className="bx bx-cart"></i>{" "}
                                {props.data.data.addToCartButtonText}
                              </button>
                            </div>
                            <div
                              class="col-lg-1"
                              style={{ paddingRight: "0" }}
                            ></div>
                          </div>
                          <div>
                            <p></p>
                          </div>
                        </div>
                      )}
                    </Popup>
                    
                    <a href="portfolio-details.html" title="More Details">
                      <i class="bx bx-link"></i>
                    </a>
                    
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
                  </Carousel>*/}

        <div class="section-title">
          <h2>{props.data ? props.data.data.title : ""}</h2>
          <p>{props.data ? props.data.data.paragraph : ""}</p>
        </div>
        <div class="row">
          <div class="col-lg-12 grid-filter justify-content-center">
            <ul id="portfolio-flters">
              <li
                class="filter-active"
                onClick={(e) => handleFilter(e)}
                value="0"
              >
                TODOS
              </li>
              {category
                ? category.map((d, i) => (
                    <li onClick={(e) => handleFilter(e)} value={i + 1}>
                      {d.categoryName}
                    </li>
                  ))
                : "Loading..."}
            </ul>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                value={search}
                onChange={onChangeInput}
                placeholder="Nombre Producto"
                style={{ marginTop: "3px" }}
              />
            </div>
          </div>
        </div>
        <div class="portfolio-container">
          <div
            class="row"
            style={{
              alignContent: "center",
              /* display: "block" */ paddingLeft: "70px",
            }}
          >
            {filteredProducts()?.map((d, i) => (
              <div class={`portfolio-item`}>
                <div
                  key={`${d.title}-${i}`}
                  class={`portfolio-wrap`}
                  style={{ alignContent: "center", display: "block" }}
                >
                  <div
                    className="product-img position-relative"
                    style={{ alignContent: "center", display: "block" }}
                  >
                    {d.featuredArticle ? (
                      <div className="avatar-sm product-ribbon-featured">
                        <div className="avatar-title-featured rounded-circle">
                          <i className="bx bx-star icon-color-featured" />
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                    {d.productPriceNew < d.productPrice &&
                    d.productPriceNew > 0 ? (
                      <div className="avatar-sm product-ribbon-offer">
                        <span className="avatar-title rounded-circle">
                          {` ${
                            (d.productPriceNew * 100) / d.productPrice - 100
                          }%`}
                        </span>
                      </div>
                    ) : (
                      <div />
                    )}
                    <div>
                      <img
                        class="portfolio-item-img"
                        width="300px"
                        height="300px"
                        alt={d.title}
                        src={d.image[0]}
                      />
                    </div>
                  </div>

                  <div class="portfolio-info">
                    <h4>{d.title}</h4>
                    <p
                      dangerouslySetInnerHTML={{ __html: d.productDescription }}
                    />
                  </div>
                  <div class="portfolio-links">
                    <Popup
                      trigger={
                        <Link
                          to={`/productDetails?productID=${d.id}`}
                          class="bx bx-info-circle"
                          style={{ cursor: "pointer" }}
                        ></Link>
                      }
                      modal
                    >
                      {(close) => (
                        <div class="card" style={{ background: "#eee" }}>
                          <div>
                            <p></p>
                          </div>
                          <div>
                            <p></p>
                          </div>
                          <div className="embla">
                            <div className="embla__viewport" ref={viewportRef}>
                              <div className="embla__container">
                                {d.image.map((image, index) => (
                                  <div className="embla__slide" key={index}>
                                    <div className="embla__slide__inner">
                                      <img
                                        className="embla__slide__img"
                                        src={image}
                                        alt={d.title}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <PrevButton
                              onClick={scrollPrev}
                              enabled={prevBtnEnabled}
                            />
                            <NextButton
                              onClick={scrollNext}
                              enabled={nextBtnEnabled}
                            />
                          </div>
                          <div className="embla__dots">
                            {scrollSnaps.map((_, index) => (
                              <DotButton
                                key={index}
                                selected={index === selectedIndex}
                                onClick={() => scrollTo(index)}
                              />
                            ))}
                          </div>

                          <div className="text-container-popup">
                            <h3>{d.title}</h3>
                            <h5>
                              {d.productPriceNew > 0 &&
                              d.productPriceNew < d.productPrice ? (
                                <div>
                                  <span className="text-muted me-2">
                                    <del>${currency(d.productPrice)}</del>
                                  </span>
                                  <b class="price">
                                    ${currency(d.productPriceNew)}
                                  </b>
                                </div>
                              ) : (
                                <div>
                                  <b class="price">
                                    ${currency(d.productPrice)}
                                  </b>
                                </div>
                              )}
                            </h5>
                            <p
                              style={{ fontSize: "14px" }}
                              dangerouslySetInnerHTML={{
                                __html: d.productDescription,
                              }}
                            />
                          </div>
                          <div class="row">
                            <div
                              class="col-lg-1"
                              style={{ paddingRight: "0" }}
                            ></div>
                            <div class="col-lg-4" style={{ paddingRight: "0" }}>
                              <button
                                onClick={() => close()}
                                className="portfolio-return-button"
                                style={{
                                  width: "100%",
                                  border: "none",
                                  height: "30px",
                                }}
                              >
                                <i className="bx bx-arrow-back" /> {"Volver"}
                              </button>
                            </div>
                            <div
                              class="col-lg-2"
                              style={{ paddingRight: "0" }}
                            ></div>
                            <div
                              class="col-lg-4"
                              style={{
                                paddingLeft: "0",
                              }}
                            >
                              <button
                                class="portfolio-add-button"
                                style={{
                                  width: "100%",
                                  border: "none",
                                  height: "30px",
                                }}
                                onClick={(e) => {
                                  handleSubmit(e, d);
                                  close();
                                }}
                              >
                                <i className="bx bx-cart"></i>{" "}
                                {props.data.data.addToCartButtonText}
                              </button>
                            </div>
                            <div
                              class="col-lg-1"
                              style={{ paddingRight: "0" }}
                            ></div>
                          </div>
                          <div>
                            <p></p>
                          </div>
                        </div>
                      )}
                    </Popup>
                    {/*
                    <a href="portfolio-details.html" title="More Details">
                      <i class="bx bx-link"></i>
                    </a>
                    */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* div container button */}
        </div>
        <div class="row">
          <div class="col-lg-1" style={{ paddingRight: "0" }}></div>
          <div class="col-lg-4" style={{ paddingRight: "0" }}>
            <button
              onClick={prevPage}
              className="portfolio-return-button"
              style={{
                width: "100%",
                border: "none",
                height: "30px",
              }}
            >
              <i className="bx bx-arrow-back" /> {"Volver"}
            </button>
          </div>
          <div class="col-lg-2" style={{ paddingRight: "0" }}></div>
          <div
            class="col-lg-4"
            style={{
              paddingLeft: "0",
            }}
          >
            <button
              class="portfolio-add-button"
              style={{
                width: "100%",
                border: "none",
                height: "30px",
              }}
              onClick={nextPage}
            >
              {"Siguiente"} <i class="bx bx-right-arrow-alt"></i>
            </button>
          </div>
          <div class="col-lg-1" style={{ paddingRight: "0" }}></div>
        </div>
      </div>
    </section>
  );
};
