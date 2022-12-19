import React, {useState} from 'react';
import {Header} from './header';
import data from '../data/data.json';
import {Footer} from './footer';
// import Select from "react-select"
import {useCart} from "../hook/useCart";

import transferJson from '../data/transferPay.json';

const EcommerceCheckout = () => {

  //meta title
  // document.title="Checkout | Skote - Vite React Admin & Dashboard Template";

  const currency = function(number){
    return new Intl.NumberFormat('de-DE').format(number);
  };
  const cartLocalStorage = JSON.parse(localStorage.getItem('cart'))
  const { cart  } = useCart();
  const [cartMap/*, setCartMap*/] = useState(cart.length>0? cart:cartLocalStorage);
  return (
    
      <div class="maincontainer">
      <Header data={data.pages.filter(e => e.pageName === "Header")[0]}/>
       <div class="container">
          <div class="py-5 text-center">
            
            <h2>{transferJson.data.titlePage}</h2>
            <p class="lead">{transferJson.data.message}</p>
          </div>                
                  <div class="transfer-card shadow-none border mb-12">
                    <div class="col-md-12 order-md-12 mb-12 transfer-card-title">
                      {transferJson.data.titleCart}
                    </div>
                    <p style={{display:"flex"}}>

                      <span class="text-muted mb-2" style={{marginRight:'5px'}}>{transferJson.data.orderID}</span>
                      <p>
                        {/* numero de orden que debe venir desde la base de datos */}
                        1
                      </p>
                    </p>
                      
                    <div class="table-responsive">
                      <table class="table align-middle mb-0 table-nowrap">
                        <thead class="table-light">
                          <tr>
                            <th scope="col"> {transferJson.data.headerTableProduct} </th>
                            <th scope="col">{transferJson.data.headerTableProductDetails}</th>
                            <th scope="col">{transferJson.data.headerTableProductPrice}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartMap?.map((product, key) => (
                            <tr key={"_orderSummary_" + key}>
                              <th scope="row">
                                <img
                                  src={product.productImg}
                                  alt={product.productImg}
                                  title="product-img"
                                  class="avatar-md"
                                />
                              </th>
                              <td>
                                <h6 class="text-truncate">
                                <p class="text-muted mb-0">
                                  {product.productName}
                                </p>
                                </h6>
                                <p class="text-muted mb-0">
                                  $ {currency(product.productPrice)} x {product.productQuantity}
                                </p>
                              </td>
                              <td>
                                <p class="text-muted mb-0">
                                  $ {currency(product.productPrice * product.productQuantity)}
                                </p>
                              </td>
                            </tr>
                          ))}
                          
                          <tr>
                            
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <h6 class="m-0 text-end">{transferJson.data.totalPay}</h6>
                            </td>
                            <td>$ {currency(cartMap?.map(product => product.productPrice * product.productQuantity).reduce((prev, curr) => prev + curr))}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                
                <hr class="mb-4" />
                <div>
                  <p class="lead">{transferJson.data.messageTransfer}</p>
                  <div>
                    <div class="mb-4 transfer-card-title">
                              {transferJson.data.titleDataBank}
                    </div>
                    <ul>
                      <li>{transferJson.data.labelNameBank} {transferJson.data.dateTransfer.nameBank}</li>
                      <li>{transferJson.data.lableName} {transferJson.data.dateTransfer.fullNamePersonBank}</li>
                      <li>{transferJson.data.labelIdPersonBankTransfer} {transferJson.data.dateTransfer.idPersonBankTransfer}</li>
                      <li>{transferJson.data.labelTypeAccount} {transferJson.data.dateTransfer.CardTitletypeAccount}</li>
                      <li>{transferJson.data.numberAccount} {transferJson.data.dateTransfer.numberAccount}</li>
                      <li>{transferJson.data.labelEmailTransfer} {transferJson.data.dateTransfer.emailTransfer}</li>
                    </ul>
                  </div>
                </div>
                <hr class="mb-4" />
                <div class="row">
                  <div class="col-md-12 order-md-12 mb-12">
                    <div class="text-sm-center">
                      <a href="/" class="btn btn-success">
                        <i class="mdi mdi-truck-fast me-1" /> {transferJson.data.buttonBack}
                        {" "}
                      </a>
                    </div>
                  </div>
              
            </div>
          
        </div>
        <hr class="mb-4" />
        <Footer data={data.pages.filter(e => e.pageName === "Footer")[0]}/>
      </div>
    
  )
}

export default EcommerceCheckout
