export const Team = (props) => {
  return (
    <section id={props.data ? props.data.href.substring(1, props.data.href.len) : ''} class="team-conteiner">
      <div class="container">
        
        <div class="section-title">
          <h2>{props.data ? props.data.data.titleTeam : ''}</h2>
          <p>{props.data ? props.data.data.paragraphTeam : ''}</p>
        </div>

        <div class="row">
          {props.data ? props.data.data.team.map((d, i) => (
            <div class="col-xl-3 col-lg-4 col-md-6" data-wow-delay="0.1s">
              <div key={`${d.title}-${i}`} class="member">
                <img src={d.img} class="img-fluid" alt="" />
                <div class="member-info">
                  <div class="member-info-content">
                    <h4>{d.name}</h4>
                    <span>{d.job}</span>
                  </div>
                  <div class="social">
                    {d.twitter === "" ? "" : 
                        <a href={d.twitter}><i class="bi bi-twitter"></i></a>
                    }
                    {d.facebook === "" ? "" : 
                        <a href={d.facebook}><i class="bi bi-facebook"></i></a>
                    }
                    {d.instagram === "" ? "" : 
                        <a href={d.instagram}><i class="bi bi-instagram"></i></a>
                    }
                    {d.linkedin === "" ? "" : 
                        <a href={d.linkedin}><i class="bi bi-linkedin"></i></a>
                    }
                  </div>
                </div>
              </div>
            </div>
          )) : 'Loading...'}
        </div>

      </div>
    </section>
  )
}