

export const About = (props) => {
    return (
        <section id={props.data ? props.data.href.substring(1, props.data.href.len) : ''} class="about">
            <div class="container">

                <div class="section-title">
                    <h2>{props.data ? props.data.data.titleAbout : ''}</h2>
                    <p>{props.data ? props.data.data.paragraph : ''}</p>
                </div>

                <div class="row">
                    {
                        props.data.data.left === true ?
                        <div class="col-lg-6">
                            {props.data.data.img !== "" ? <img src={props.data ? props.data.data.img : ''} class="img-fluid" alt="" /> : ""} 
                            {props.data.data.video !== "" ? <iframe title="Video" id={props.data ? "iframe"+props.data.href.substring(1, props.data.href.len) : ''} src={props.data ? props.data.data.video : ''} class="img-fluid" allowfullscreen style={{width:'100%', height: '100%'}} controls/> : ""} 
                        </div>
                        : ""
                    }
                    
                    <div class="col-lg-6 pt-4 pt-lg-0 content">
                        <h3>{props.data ? props.data.data.titleSkills : ''} <strong>{props.data ? props.data.data.subTitleSkills : ''}</strong></h3>
                        <p class="fst-italic">
                            {props.data ? props.data.data.textSkills : ''}
                        </p>
                        <p>
                            {props.data ? props.data.data.subTextSkills : ''}
                        </p>
                        {props.data ? props.data.data.skills.map((d, i) => (
                            <div class="skills-content">
                                <div key={`${d.language}`} class="progress">
                                    <span class="skill">{d.language}<i class="val">{d.percentage}</i></span>
                                </div>
                            </div>
                        )) : "loading"}
                    </div>

                    {
                        props.data.data.left === false ?
                        <div class="col-lg-6">
                            {props.data.data.img !== "" ? <img src={props.data ? props.data.data.img : ''} class="img-fluid" alt="" /> : ""} 
                            {props.data.data.video !== "" ? <iframe title="Video" id={props.data ? "iframe"+props.data.href.substring(1, props.data.href.len) : ''} src={props.data ? props.data.data.video : ''} class="img-fluid" allowfullscreen style={{width:'100%', height: '100%'}} controls/> : ""} 
                        </div>
                        : ""
                    }
                </div>

            </div>
        </section>
    )
}