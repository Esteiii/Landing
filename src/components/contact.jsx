import { useState } from 'react'
import {SimpleraMesage} from "../custom/simplera/js/simpleraJs"

const simpleraMessageContent = {
    name: '',
    email: '',
    message: '',
}

export const Contact = (props) => {

    const [{ name, email, message }, setState] = useState(simpleraMessageContent)

    const handleChange = (e) => {
        const { name, value } = e.target
        setState((prevState) => ({ ...prevState, [name]: value }))
    }
    const clearState = () => setState({ ...simpleraMessageContent })

    const handleSubmit = (e) => {
        e.preventDefault()
        
        SimpleraMesage.send(
            props.data.orgId,
            email,
            name,
            message
        ).then(
            (result) => {
                alert(props.data.sendOkMessage);
                clearState()
            },
            (error) => {
                alert(`Error al enviar el mensaje: ${error}`);
                console.log(error)
            }
        )
        
        // emailjs
        //     .sendForm(
        //         /*Aporte por Eduardo Lopez*/
        //         'service_1vdyokl', 'template_cfezfvo', e.target, 'mWbyNq2B-DwTvYApy'
        //     )
        //     .then(
        //         (result) => {
        //             console.log(result.text)
        //             clearState()
        //         },
        //         (error) => {
        //             console.log(error.text)
        //         }
        //     )
            
    }
    return (
        <section id={props.data ? props.data.href.substring(1, props.data.href.len) : ''} class="contact section-bg">
            <div class="container">
                <div class="section-title">
                    <h2>{props.data ? props.data.data.titleContact : ''}</h2>
                    <p>{props.data ? props.data.data.paragraph : ''}</p>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6 d-flex align-items-stretch infos">
                        <div class="row">
                            <div class="col-lg-6 info d-flex flex-column align-items-stretch">
                                <i class="bx bx-map"></i>
                                <h4>{props.data ? props.data.data.addressTitle : ''}</h4>
                                <p>{props.data ? props.data.data.address : ''}</p>
                            </div>
                            <div class="col-lg-6 info info-bg d-flex flex-column align-items-stretch">
                                <i class="bx bx-phone"></i>
                                <h4>{props.data ? props.data.data.phoneTitle : ''}</h4>
                                <p>{props.data ? props.data.data.phone : ''}</p>
                            </div>
                            <div class="col-lg-6 info info-bg d-flex flex-column align-items-stretch">
                                <i class="bx bx-envelope"></i>
                                <h4>{props.data ? props.data.data.emailTitle : ''}</h4>
                                <p>{props.data ? props.data.data.email : ''}</p>
                            </div>
                            <div class="col-lg-6 info d-flex flex-column align-items-stretch">
                                <i class="bx bx-time-five"></i>
                                <h4>{props.data ? props.data.data.availableTitle : ''}</h4>
                                <p>{props.data ? props.data.data.available : ''}<br />{props.data ? props.data.data.available2 : ''}</p>
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-6 d-flex align-items-stretch contact-form-wrap">
                        <form action="" method="post" class="simplera-email-form" validate onSubmit={handleSubmit}>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label for="name">{props.data ? props.data.data.name : ''}</label>
                                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required onChange={handleChange} />
                                </div>
                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                    <label for="email">{props.data ? props.data.data.mail : ''}</label>
                                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required onChange={handleChange} />
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <label for="message">{props.data ? props.data.data.message : ''}</label>
                                <textarea class="form-control" name="message" rows="8" required onChange={handleChange}></textarea>
                            </div>
                            <div class="my-3">
                                <div class="loading">{props.data ? props.data.data.loading : ''}</div>
                                <div class="error-message"></div>
                                <div class="sent-message">{props.data ? props.data.data.loadingMessage : ''}</div>
                            </div>
                            <div class="text-center"><button type="submit">{props.data ? props.data.data.buttonTitle : ''}</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}