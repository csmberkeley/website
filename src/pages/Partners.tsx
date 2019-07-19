import React from "react";

import * as Labels from "../labels/PartnerLabels";

import goldmanLogo from "../img/sponsors/goldman-sachs.png";
import mckinseyLogo from "../img/sponsors/mckinsey.png";

export default class Partners extends React.Component {
    render() {
        return (
            <div>
                <section className="center green lighten-1 stats header">
                    <h5 className="white-text">{ Labels.TITLE }</h5>
                    <h6 className="white-text subtitle">{ Labels.SUBTITLE }</h6>
                </section>

                <div className="container">
                    <div className="section">
                        <h5 className="label">{ Labels.OUR_PARTNERS_LABEL }</h5>
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
                        <h5 className="label">{ Labels.SUPPORT }</h5>
                        { Labels.MISSION_JSX }
                    </div>
                </div>
            </div>
        );
    }
}
