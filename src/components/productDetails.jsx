import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import InnerImageZoom from 'react-inner-image-zoom'
import Swal from "sweetalert2";

//Components
import { Header } from "./header";
import { Footer } from "./footer";

//Hooks
import { useCart } from "../hook/useCart";

//Data
import products from "../data/products.json";
import data from "../data/data.json";
//CSS
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'

export const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const idParams = location.search.slice(
    location.search.lastIndexOf("=") + 1,
    location.search.length
  );
  const [product, setProduct] = useState();
  const currency = function (number) {
    return new Intl.NumberFormat("de-DE").format(number);
  };

  useEffect(() => {
    products.filter((product) => {
      if (product.id == idParams) {
        setProduct(product);
      }
    });
  }, []);
 

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
    Swal.fire(
      "Producto Agregado",
      `${productoSeleccionado.productName} ha sido agregado al carrito exitozamente `,
      "success"
    ) 
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  
  }, [handleSubmit])
  


  return (
    <React.Fragment>
      <Header data={data.pages.filter((e) => e.pageName === "Header")[0]} />
      <div style={{ background: "#eeeeee", padding: "10px" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="titleContainer">
                <Link className="dt-volver-link" to='/#products'  > <i class="bx bx-arrow-back"></i> Volver a los Productos</Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card" style={{ border: "none" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      {product?.image.map((image, key) => (
                    
                         <InnerImageZoom src={image} alt={product?.title} key={key}/>
                           
                        
                      ))}
                    </div>
                    <div className="col-xl-6">
                      <div className="mt-4 mt-xl-3">
                        <h3>{product?.title}</h3>
                        <h5>
                          {product?.productPriceNew > 0 &&
                          product?.productPriceNew < product?.productPrice ? (
                            <div>
                              <span className="text-muted me-2">
                                <del>${currency(product?.productPrice)}</del>
                              </span>
                              <b class="price">
                                ${currency(product?.productPriceNew)}
                              </b>
                            </div>
                          ) : (
                            <div>
                              <b class="price">
                                ${currency(product?.productPrice)}
                              </b>
                            </div>
                          )}
                        </h5>
                        <p
                          style={{ fontSize: "14px" }}
                          dangerouslySetInnerHTML={{
                            __html: product?.productDescription,
                          }}
                        />
                        <button
                                class="portfolio-add-button"
                                style={{
                                  width: "100%",
                                  border: "none",
                                  height: "30px",
                                }}
                                onClick={(e) => {
                                  handleSubmit(e, product);
                                  console.log(product)
                                }}
                              >
                                <i className="bx bx-cart"></i>{" "}
                                {"Agregar al Carrito"}
                              </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer data={data.pages.filter((e) => e.pageName === "Footer")[0]} />
    </React.Fragment>
  );
};
