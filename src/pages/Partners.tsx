import React from "react";

import goldmanLogo from "../img/sponsors/goldman-sachs.png";
import mckinseyLogo from "../img/sponsors/mckinsey.png";

export default class Partners extends React.Component {
    render() {
        return (
            <div>
                <section className="center green lighten-1 stats header">
                    <h5 className="white-text">For Partners</h5>
                    <h6 className="white-text subtitle">
                        Collaborate with us to host events for the largest CS
                        community at UC Berkeley.
                    </h6>
                </section>

                <div className="container">
                    <div className="section">
                        <h5 className="label">Our Partners</h5>
                        <br />
                        <div className="row">
                            <div className="col m4 s6 valign">
                                <img
                                    src={goldmanLogo}
                                    className="responsive-img"
                                />
                            </div>
                            <div className="col m4 s6 valign">
                                <img
                                    src={mckinseyLogo}
                                    className="responsive-img"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <h5 className="label">Support</h5>
                        <p className="info">
                            CSM is a dedicated organization to education and
                            technology. Besides providing group tutoring, we can
                            also work with you to host events and connect you to
                            the rest of the Berkeley community.
                        </p>
                        <p className="info">
                            Throughout the year, we partner with companies to
                            host tech talks, infosessions, and more!
                        </p>
                        <p className="info">
                            <a href="mailto:mentors@berkeley.edu">Contact us</a>{" "}
                            for more information on what we can provide for you.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
