export const AttributesWithImage = (props) => {
  return (
    <section
      id={props.data ? props.data.href.substring(1, props.data.href.len) : ""}
      class="centred"
      style={{
        marginBottom: props.data.data.marginTBottom ?? "",
        marginTop: props.data.data.marginTop ?? "",
        paddingTop: "0px",
        paddingBottom: props.data.data.paddingBottom ?? "0px",
      }}
    >
      <div
        class="container"
        style={{
          maxHeight: props.data.data.maxHeight ?? "500px",
          transition: "ease-in-out 0.3s",
        }}
      >
        <div class="section-title">
          <h3>{props.data ? props.data.data.title : ""}</h3>
          <p>{props.data ? props.data.data.paragraph : ""}</p>
        </div>
        <div
          class="row"
          style={{ maxHeight: props.data.data.maxHeight ?? "500px" }}
        >
          {props.data.data.left === true ? (
            <div key="imgLeft" class="col-lg-4" style={{ height: "100%" }}>
              {props.data.data.img !== "" ? (
                <img
                  src={props.data ? props.data.data.img : ""}
                  class="img-fluid"
                  style={{
                    marginBottom: "10px",
                    height: "100%",
                    alignContent: "center",
                  }}
                  alt=""
                />
              ) : (
                ""
              )}
              {props.data.data.video !== "" ? (
                <iframe
                  title="Video"
                  id={
                    props.data
                      ? "iframe" +
                        props.data.href.substring(1, props.data.href.len)
                      : ""
                  }
                  src={props.data ? props.data.data.video : ""}
                  class="img-fluid"
                  allowfullscreen
                  style={{
                    width: "100%",
                    height: "100%",
                    marginBottom: "10px",
                  }}
                  controls
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <div class="row col-lg-8 col-md-8 col-xs-12 col-12 col-sm-12 pt-8 pt-lg-0">
            {props.data
              ? props.data.data.items.map((d, i) => (
                  <div class="col-sm-12 col-md-5 col-lg-6 col-xs-12 col-12">
                    <div key={`${d.title}-${i}`} class="row">
                      <div class="col-lg-1  col-md-1  col-sm-1 col-xs-1 col-1 icon">
                        <i
                          class={d.iconClass}
                          style={{ color: d.iconColor }}
                        ></i>
                      </div>
                      <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11 col-11">
                        <h6
                          class="title"
                          style={{
                            paddingLeft: "10px",
                            wordWrap: "break-word",
                          }}
                        >
                          {d.title}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>

          {props.data.data.left === false ? (
            <div key="imgRight" class="col-lg-4" style={{ height: "100%" }}>
              {props.data.data.img !== "" ? (
                <img
                  src={props.data ? props.data.data.img : ""}
                  class="img-fluid"
                  style={{ marginBottom: "10px", height: "100%" }}
                  alt=""
                />
              ) : (
                ""
              )}
              {props.data.data.video !== "" ? (
                <iframe
                  title="Video"
                  id={
                    props.data
                      ? "iframe" +
                        props.data.href.substring(1, props.data.href.len)
                      : ""
                  }
                  src={props.data ? props.data.data.video : ""}
                  class="img-fluid"
                  allowfullscreen
                  style={{ width: "100%", height: "100%" }}
                  controls
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
