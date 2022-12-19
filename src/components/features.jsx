export const Features = (props) => {
  return(
    <section id={props.data ? props.data.href.substring(1, props.data.href.len) : ''} class="more-services section-bg">
      <div class="container">
        <div class="row">
          {props.data ? props.data.data.features.map((d, i) => (
          <div class="col-lg-3 col-md-6 d-flex align-items-stretch mb-5 mb-lg-0">
            <div key={`${d.title}-${i}`} class="card">
              <img src={d.img} class="card-img-top" alt="" />
              <div class="card-body">
                <h5 class="card-title"><a href={d.href}>{d.title}</a></h5>
                <p class="card-text">{d.text}</p>
                <a href={d.buttonHref} class="btn">{props.data ? d.buttonHero : ''}</a>
              </div>
            </div>
          </div>
          )) : 'Loading...'}
        </div>
      </div>
    </section>
    

    )
}