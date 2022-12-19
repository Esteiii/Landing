export const HeroCarousel = (props) => {
    return (
        <section id={props.data ? props.data.href.substring(1, props.data.href.len) : ''}>
            <div class="hero-container">
                <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
                    <div class="carousel-inner" role="listbox">
                        {props.data ? props.data.data.heroCarousel.map((d, i) => (
                        <div id={`${props.data.pageName}-${d.title}-${i}`} class={i === 0 ? "carousel-item active" : "carousel-item"}>
                            <img src={d.img} alt={d.title} style={{width:'100%', height:'100%', objectFit: 'cover'}} />
                            <div class="carousel-container">
                                <div class="carousel-content">
                                    <h2 class="animate__animated animate__fadeInDown">{d.title}</h2>
                                    <p class="animate__animated animate__fadeInUp">{d.text}</p>
                                    {props.data.data.buttonHero === "" ? "" : <a href={props.data.data.buttonHref} class="btn-get-started animate__animated animate__fadeInUp scrollto">{props.data ? props.data.data.buttonHero : ''}</a>}
                                </div>
                            </div>
                        </div>
                        )) : 'Loading...'}
                    </div>
                    <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bi bi-chevron-double-left" aria-hidden="true"></span>
                    </a>
                    <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
                        <span class="carousel-control-next-icon bi bi-chevron-double-right" aria-hidden="true"></span>
                    </a>
                </div>
            </div>
        </section>
    )
}