export const Services = (props) => {
  return (
    <section id={props.data ? props.data.href.substring(1, props.data.href.len) : ''} class="info-box py-0">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">
            <div class="content">
              <h3>{props.data ? props.data.data.titleServices : ''}</h3>
              <p>
                {props.data ? props.data.data.paragraphServices : ''}
              </p>
            </div>
            <div class="accordion-list">
                <div >
                  <ul>
                    {props.data ? props.data.data.services.map((d, i) => (
                    <li key={`${d.title}-${i}`}>
                      <a href={d.href} data-bs-toggle="collapse" class="collapse" data-bs-target={`#accordion-list-${i}`}><span>-</span>{d.title}<i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
                      <div id={`accordion-list-${i}`} class="collapse show" data-bs-parent=".accordion-list">
                        <p>{d.text}</p>
                        <p2>{d.subText}</p2>
                      </div>
                    </li>
                    )) : 'Loading...'}
                  </ul>
                </div>
            </div>
          </div>
          <img src="img/more-service-1.jpg" class="col-lg-5 align-items-stretch order-1 order-lg-2 img" alt="" />
        </div>
      </div>
    </section>
  )
}



