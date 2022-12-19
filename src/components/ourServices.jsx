/*
ver íconos en: https://icon-sets.iconify.design/bx/timer/
*/
export const OurServices = (props) => {
  return (
    <section
      id={props.data ? props.data.href.substring(1, props.data.href.len) : ""}
      class="services"
    >
      <div class="container">
        <div class="section-title">
          <h2>{props.data ? props.data.data.title : ""}</h2>
          <p>{props.data ? props.data.data.paragraph : ""}</p>
        </div>
        <div class="row">
          {props.data
            ? props.data.data.items.map((d, i) => (
                <div class="col-md-12 col-lg-4 col-lg-3 d-flex align-items-stretch mb-5 mb-3 mb-lg-0">
                  <div key={`${d.title}-${i}`} class="icon-box">
                    <div class="icon">
                      <i class={d.iconClass}></i>
                    </div>
                    <h4 class="title">
                      <a href={d.href}>{d.title}</a>
                    </h4>
                    <p class="description">{d.text}</p>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </section>
  );
};
