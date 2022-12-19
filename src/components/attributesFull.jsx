export const AttributesFull = (props) => {
  return (
    <section
      id={props.data ? props.data.href.substring(1, props.data.href.len) : ""}
      class="centred"
      style={{
        marginTop: props.data.data.marginTop ?? "",
        marginBottom: props.data.data.marginTBottom ?? "",
        paddingTop: "0px",
        paddingBottom: "0px",
      }}
    >
      <div class="container">
        <div class="section-title">
          <h3>{props.data ? props.data.data.titleOurServices : ""}</h3>
          <p>{props.data ? props.data.data.paragraphOurServices : ""}</p>
        </div>
        <div class="row">
          {props.data
            ? props.data.data.ourServices.map((d, i) => (
                <div class="col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-5 mb-3 mb-lg-0">
                  <div key={`${d.title}-${i}`} class="icon-box wrap-float">
                    <div class="icon">
                      <i class={d.iconClass}></i>
                    </div>
                    <h6 class="title" style={{ paddingLeft: "10px" }}>
                      <a href={d.href}>{d.title}</a>
                    </h6>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </section>
  );
};
