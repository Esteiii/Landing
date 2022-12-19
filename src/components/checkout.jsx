import React, {useState,useEffect} from 'react';
import {
  Link, useNavigate
} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../custom/axios/js/axios";
import {useCart} from "../hook/useCart";
import {Header} from './header';
import {Footer} from './footer';
import data from '../data/data.json';
import regiones from '../data/regiones.json';
import { Loading } from './loading';


export const Checkout =() => {
  const cartLocalStorage = JSON.parse(localStorage.getItem('cart'))
  const checkoutJson= require("../data/checkout.json");
  const { cart,setCart  } = useCart();
  const navigate = useNavigate();
  const [cartMap/*, setCartMap*/] = useState(cart.length>0? cart:cartLocalStorage);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [commentary, setCommentary] = useState('');
  const [regionUser, setRegionUser] = useState('');
  const [comunaUser, setComunaUser] = useState('');
  const [phone, setPhone] = useState('');
  // Datos para crear una cuenta
  // const [createAccount, setCreateAccount] = useState('no');
  // const [password, setPassword] = useState('');
  const [paymentMethod, setpaymentMethod] = useState('');
  const [buttonName, setButtonName] = useState('');
  //Loading
  const [ isLoading, setIsLoading ] = useState();
  const currency = function(number){
    return new Intl.NumberFormat('de-DE').format(number);
  };

  useEffect(() => {
    for (const product of cartMap) {
      productAmmount(product.productId)
    }
    /*
    cartMap.map( ( product) =>{
      productAmmount(product.productId)
    } )
    */
  }, [useCart])
  

  const grandTotal = (cart?.map (product =>(

     product.productPrice*product.productQuantity

  )));
  function productAmmount (id) {
    setCart(
      cartMap?.map ((product) =>
       product.productId === id ? {...product, productAmount: product.productPrice*product.productQuantity} : product 
      )
    )
  }
 
  const precioTotal = grandTotal.reduce((a,b)=>a+b,0);
  // const discount = (productList.map (product =>(
  //   product.productPrice*product.cartQuantity-product.productPriceDiscount*product.cartQuantity
  // ))) 
  // const discountTotal = discount.reduce((a,b)=>a+b,0);
  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const onChangeCommentary = (event) => {
    setCommentary(event.target.value);
  };
  const onChangeRegion = (event) => {
    setRegionUser(event.target.value);
  };
  const onChangeComunaUser = (event) => {
    setComunaUser(event.target.value);
  };
  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };
  // onChange para las variables que crean cuenta
  // const onChangeCrearCuenta = (event) => {
    
  //   setCreateAccount(event.target.value);
  //   console.log (createAccount)
  // };
  
  // const onChangePassword = (event) => {
  //   setPassword(event.target.value);
  // };
  const onChangePayMethod = (event) => {
    setpaymentMethod(event.target.value);
    let myPayment = checkoutJson.data.arrayPayment.filter(e=>e.id === event.target.value);
    
    if (myPayment.length === 1) {
      setButtonName(myPayment[0].buttonName);
    }
  };

  
  const handlePago = (e) =>{
    
    e.preventDefault();
    setIsLoading(true);
    const body = {
      customerName:`${firstName} ${lastName}`,
      customerPhone:phone,
      customerEmail:email,
      customerAddress:address,
      cartPaymentMethod:paymentMethod,
      //commentary:commentary,
      customerState:regionUser,
      customerCity:comunaUser,
      cartAmount:precioTotal,
      products: cart,
    }
   
    
    axios.post('/cart/v1/',body).then((response)=> {
      setIsLoading(false);
      let myPayment = checkoutJson.data.arrayPayment.filter(e=>e.id === paymentMethod);
      navigate(myPayment[0].route);
      Swal.fire(
        "Orden Generada",
        `Su orden se ha generado correctamente sera transferido(a) a su resumen de compra `,
        "success"
      )     
    }
    ).catch((e)=>Swal.fire(
      "Intento Fallido",
      `Notificar al Vendedor: ${e}`,
      "error"
    ) );
    
  };

  var comunaSelecion= regiones.regiones.filter(e=> e.region === regionUser).map((region) => {
    return region.comunas 
  });
  /*
  var comunaSelecion= regiones.regiones.map((region) => {
    if (regionUser === region.region){
       return region.comunas 
    }
  });
  */
  comunaSelecion = comunaSelecion.filter((comuna)=>{
    return comuna!== undefined
  })
  
    
  return (
    

    <div className="checkout">
        <Header data={data.pages.filter(e => e.pageName === "Header")[0]}/>
        <div class="container">
          <div class="py-5 text-center">
            
            <h2>{checkoutJson.data.pageName}</h2>
            <p class="lead">{checkoutJson.data.message}</p>
          </div>
          <div class="row">
            <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">{checkoutJson.data.titleCart}</span>
                <span class="badge badge-secondary badge-pill">3</span>
              </h4>
              <ul class="list-group mb-3">
                <li >
                  {cartMap?.map (( product) =>
                  (
                    <li className='list-group-item d-flex justify-content-between lh-condensed'>
                      <div style={{display:'flex', marginRight:'10px'}}>
                        <img src={product.productImg} alt={product.productName} height='60px' width={'60px'} />
                        <div style={{ marginLeft:'10px'}}>
                          <h6 class="my-0">{product.productName}</h6>
                          <small class="text-muted">{product.productDescription}</small>
                          <small class="text-muted">{checkoutJson.data.quantityProduct}: {product.productQuantity}</small>
                        </div>
                      </div>
                      <span class="text-muted">${currency(product.productPrice*product.productQuantity)}</span>
                    </li>
                  ))}
                </li>
                
                <li class="list-group-item d-flex justify-content-between">
                  <span>{checkoutJson.data.totalBuy} (CLP)</span>
                  <strong>${currency(precioTotal)}</strong>
                </li>
              </ul>
            </div>
            <div class="col-md-8 order-md-1">
              <h4 class="mb-3">{checkoutJson.data.titleDataClient}</h4>
              <form onSubmit={e=>handlePago(e)} >
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label htmlFor="firstName">{checkoutJson.data.nameCliente}</label>
                    <input type="text" class="form-control" id="firstName" placeholder="" value={firstName} onChange={onChangeFirstName} required />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName">{checkoutJson.data.lastNameCliente}</label>
                    <input type="text" class="form-control" id="lastName" placeholder="" value={lastName} onChange={onChangeLastName} required />
                  </div>
                </div>
                {/* <div class="mb-3">
                  <label for="username">Username</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">@</span>
                    </div>
                    <input type="text" class="form-control" id="username" placeholder="Username" required />
                    <div class="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div> */}
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="lastName">{checkoutJson.data.phoneClient}</label>
                    <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">+56</span>
                    </div>
                    <input type="phone" class="form-control" id="phone" placeholder="9XXXXXXXX" value={phone} onChange={onChangePhone} maxLength="9" required />
                  </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="email">{checkoutJson.data.emailClient} </label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com" value={email} onChange={onChangeEmail} required/>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="address">{checkoutJson.data.addressClient}</label>
                  <input type="text" class="form-control" id="address" placeholder="1234 Main St" value={address} onChange={onChangeAddress} required />
                </div>
                <div class="mb-3">
                  <label for="address2">{checkoutJson.data.addressComentaryClient}  <span class="text-muted">(Opcional)</span></label>
                  <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" value={commentary} onChange={onChangeCommentary} />
                </div>
                <div class="row">
                  <div class="col-md-5 mb-3">
                    <label for="country">{checkoutJson.data.regionClient}</label>
                    <select class="custom-select d-block w-100" id="country" value={regionUser} onChange={onChangeRegion} required>
                      <option value=""placeholder='Seleccione una Región' > Seleccione una Región</option>
                      {regiones.regiones.map ( (region) =>(

                      <option>{region.region}</option>
                      ))}
                    </select>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="state">{checkoutJson.data.comunaClient}</label>
                    <select class="custom-select d-block w-100" id="state" value={comunaUser} onChange={onChangeComunaUser} placeholder='Seleccione una comuna' required>
                       {comunaSelecion.map ( (comunas) =>(
                        comunas.map((comuna) =><option>{comuna}</option> )
                       ))}
                    </select>
                  </div>
                </div>
                {/* Opcion para agregar boton de Crear una cuenta

                <hr class="mb-4" />
                <div class="custom-control custom-checkbox" style={{margin:'5px'}}>
                  <input type="checkbox" class="custom-control-input" id="createAccount" value={createAccount=== 'si'?'no':'si' } onChange={onChangeCrearCuenta}  />
                  <label class="custom-control-label" style={{marginLeft:'5px'}} for="same-address">¿Crear Cuenta?</label>
                </div>
                {createAccount=== 'si' ?(

                <div class="col-md-6 mb-3">
                    <label for="password">Contraseña</label>
                    <input type="password" class="form-control" id="firstName" placeholder="" value={password} onChange={onChangePassword} required />
                </div>
                ):null
                } */}
                <hr class="mb-4" />
                <h4 class="mb-3">{checkoutJson.data.payment}</h4>
                <div class="d-block my-3">
                { checkoutJson.data?.arrayPayment.filter(e=> e.active).map( (payment,i) => (
                  <div class="custom-control custom-radio" style={{paddingBottom:'20px'}}> 
                    <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" value={payment.id} checked={paymentMethod === payment.id ?true :false} onChange={onChangePayMethod} required />
                    <img src={payment.img}  alt={payment.name} style={{width:'120px', height:'40px', marginRight:'5px', marginLeft:'5px'}} />
                    
                  </div>
                )) }
                </div>
                <hr class="mb-4" />
                <div class="row">
                    <div class="col-md-4 order-md-4 mb-4">
                      <Link to="/" className="btn btn-secondary">
                        <i className="mdi mdi-arrow-left me-1" />
                        {checkoutJson.data.buttonReturn}{" "}
                      </Link>
                    </div>
                    <div class="col-md-4 order-md-4 mb-4">
                      {
                        buttonName === ""
                        ? <div/>
                        : <button className="btn btn-success" type='submit'>
                            <i className="mdi mdi-cart-arrow-right me-1" />{" "}
                            {buttonName}{" "}
                          </button>
                      }
                    </div>
                </div>
                <hr class="mb-4" />
              </form>
              
            </div>
            { isLoading && <Loading/>}
          </div>

        </div>
        <Footer data={data.pages.filter(e => e.pageName === "Footer")[0]}/>
      </div>
  );
};
