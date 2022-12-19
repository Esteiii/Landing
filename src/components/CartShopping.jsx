import React, { useEffect } from "react";
import {useCart} from "../hook/useCart";



export const CartShopping = (props) => {
  
  let cartLocalStorage = "";
  let cartReaded = localStorage?.getItem('cart');
  if (cartReaded !== undefined && cartReaded !== "undefined") {
    cartLocalStorage = JSON.parse(cartReaded)
  }

  const { cart, setCart } = useCart();
  const currency = function(number){
    return new Intl.NumberFormat('de-DE').format(number);
  };
  //meta title
  useEffect(() => {
    if(cart?.length===0 && cartLocalStorage?.length>0){
      setCart(cartLocalStorage);
    }
  }, [useCart])
  
  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(cart ?? ""))
  });
  

  function removeCartItem(id) {
    var filtered = cart?.filter(function (item) {
      return item.productId !== id;
    });

    setCart(filtered);
    
   
  }

  function countUP(id, prev_data_attr) {
    setCart(
      cart?.map((p) =>
        p.productId === id ? { ...p, productQuantity: prev_data_attr + 1  } : p
      )
    );
  }

  function countDown(id, prev_data_attr) {
    setCart(
      cart?.map((p) =>
        p.productId === id ? { ...p, productQuantity: prev_data_attr - 1 } : p
      )
    );
  }
  const handleCartSubmit = (cart) =>{
    localStorage.setItem('cart',JSON.stringify(cart ?? ""))
  }

  //   const grandTotal = (productList.map (product =>(

  //     product.productPrice*product.cartQuantity

  //   )));

  //   const precioTotal = grandTotal.reduce((a,b)=>a+b,0);
  //   const discount = (productList.map (product =>(
  //     product.productPrice*product.cartQuantity-product.productPriceDiscount*product.cartQuantity
  //   )))
  //   const discountTotal = discount.reduce((a,b)=>a+b,0);

  return (
    <div>
      <section id={props.data ? props.data.href.substring(1, props.data.href.len) : ''}>
          <div class="section-title">
            <h2>{props.data ? props.data.data.title : ""}</h2>
          </div>
          <React.Fragment>
            <div class="page-content">
              <div class="container" fluid>
                
                  <div class="table-responsive">
                    <table class="table align-middle mb-0 table-nowrap">
                      <thead class="table-light">
                        <tr>
                          <th style={{width: '50%', minWidth: '300px'}}> {props.data.data.headerTableProduct} </th>
                          <th style={{width: '10%', minWidth: '100px', textAlign: 'right'}}>{props.data.data.headerTableProductPrice}</th>
                          <th style={{width: '20%', minWidth: '150px', textAlign: 'right'}}>{props.data.data.headerTableProductQuantity}</th>
                          <th style={{width: '20%', minWidth: '200px', textAlign: 'right'}}>{props.data.data.totalPay}</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart?.map((product) => (
                          <tr key={product.productId}>
                            <td>
                              <div style={{whiteSpace: 'nowrap', overflowX: 'auto'}}>
                                <div style={{display: 'inline-block'}}>
                                  <img
                                      src={product.productImg}
                                      alt={product.productName}
                                      title={product.productName}
                                      class="avatar-md"
                                  />
                                </div>
                                <div style={{display: 'inline-block'}}>
                                  <h6 class="font-size-12 text-truncate">
                                  &nbsp;&nbsp;&nbsp;
                                  </h6>
                                </div>
                                <div style={{display: 'inline-block'}}>
                                  <h6 class="text-truncate">
                                    {product.productName}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td style={{textAlign: 'right'}}>$ {currency(product.productPrice)}</td>
                            <td style={{textAlign: 'right'}}>
                              <div style={{whiteSpace: 'nowrap', overflowX: 'auto'}}>
                                <div class="portfolio-cart-button" style={{display: 'inline-block'}}>
                                  <button type="button" class="btn" onClick={() => {
                                      countDown(
                                        product.productId,
                                        product.productQuantity
                                      );
                                      // handleDeleteProductUpdate(product);
                                    }}> - 
                                  </button>
                                </div>
                                <div style={{display: 'inline-block', minWidth: '50px', textAlign: 'center'}}>
                                  <h6 class="text-truncate" style={{padding: '0px 0', overflow: "unset"}}>
                                    {product.productQuantity >= 1
                                        ? product.productQuantity
                                        : removeCartItem(product.productId)}
                                  </h6>
                                </div>
                                <div class="portfolio-cart-button" style={{display: 'inline-block'}}>
                                  <button type="button" class="btn" onClick={() => {
                                      countUP(
                                        product.productId,
                                        product.productQuantity
                                      );
                                      // handleAddProductUpdate(product);
                                    }}> +
                                  </button>
                                </div>
                              </div>

                            </td>
                            <td style={{textAlign: 'right'}}>
                              ${" "}
                              {product.productQuantity >= 0
                                ? currency(product.productQuantity * product.productPrice): 0
                              }
                            </td>
                            <td style={{textAlign: 'right'}}>
                              <button class ='buttonTrash' onClick={() => {
                                  removeCartItem(product.productId);
                                }}>
                                <i class="bx bx-trash buttonIconTrash" id="img-carrito"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div style={{alignContent: 'revert'}}>
                    <div class="text-sm-end mt-2 mt-sm-0">
                      <a href="/checkout" class="cart-btn" onClick={ ()=> handleCartSubmit(cart) }>
                        <i class="mdi mdi-cart-arrow-right me-1"/>{" "}
                        {props.data.data.buttonReview}{" "}
                      </a>
                    </div>
                      
                  </div>
              </div>
            </div>
          </React.Fragment>
        </section>
      
    </div>
  );
};
