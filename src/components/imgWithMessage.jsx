export const ImgWithMessage = (props) => {
    return (
        <section id={props.data ? props.data.href.substring(1, props.data.href.len) : ''} style={{marginTop:props.data.data.marginTop ?? '', marginBottom:props.data.data.marginTBottom ?? '', paddingTop: '0px', paddingBottom: '0px'}}>
            <div class="imgWithMessage-container">
                {
                    props.data.data.img !== "" 
                        ? <img src={props.data.data.img} alt={props.data.data.title} style={{width:'100%', height:'100%', minHeight:props.data.data.maxHeight ?? '300px', maxHeight:props.data.data.maxHeight ?? '300px', objectFit: 'cover', filter:props.data.data.filter ?? 'grayscale(50%)'}}  />
                        : <div alt={props.data.data.title} style={{background:'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',  width:'100%', height:'100%', maxHeight:props.data.data.maxHeight ?? '300px'}}  />
                }
                
                <div class="imgWithMessage-centered" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',  borderRadius:'15px', marginLeft:'0px', paddingLeft:'0px'}}>
                    <h2 class="animate__animated animate__fadeInDown">{props.data.data.title}</h2>
                    <p class="animate__animated animate__fadeInUp">{props.data.data.text1 ?? ""}</p>
                    <p class="animate__animated animate__fadeInUp">{props.data.data.text2 ?? ""}</p>
                    {props.data.data.buttonHref === "" ? "" : <a href={props.data.data.buttonHref} class="btn-get-started animate__animated animate__fadeInUp scrollto imgWithMessage-btn">{props.data ? props.data.data.buttonText : ''}</a>}
                </div>
            </div>
        </section>
    )
    }