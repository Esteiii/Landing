/*
posibles class
bi bi-emoji-smile
bi bi-journal-richtext
bi bi-headset
bi bi-people
*/

export const Counts = (props) => {
    return (
        <section class="counts section-bg">
            <div class="container">
                <div class="row no-gutters">
                    {props.data ? props.data.data.items.map((d, i) => (
                        <div class="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                            <div class="count-box">
                                <i class={d.class}></i>
                                <span data-purecounter-start={d.startCounter} data-purecounter-end={d.endCounter} data-purecounter-duration="1" class="purecounter">${d.endCounter}</span>
                                <p>${d.text}</p>
                                {d.buttonMessage === "" ? "" : 
                                    <a href={d.href}>{d.buttonMessage}</a>
                                }
                            </div>
                        </div>

                    )) : 'Loading...'}
                </div>

            </div>
        </section>

    )
}