export const Cta = (props) => {
    return (
        <section id={props.data ? props.data.href.substring(1, props.data.href.len) : ''} class="cta" style={{}}>
            <div class="container">
                <div class="text-center">
                    <h3>{props.data.data.titleCta ? props.data.data.titleCta : ''}</h3>
                    <p>{props.data.data.textCta ? props.data.data.textCta : ''}</p>
                    {
                        props.data.data.onAction !== ""
                         ? <a class="cta-btn" href={props.data.data.onAction}>{props.data ? props.data.data.textAction : ''}</a>
                         : ""
                    }
                    
                </div>
            </div>
        </section>
    )
}