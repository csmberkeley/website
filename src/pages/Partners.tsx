import React from "react";

import * as Labels from "../labels/PartnerLabels";

export default class Partners extends React.Component {
    render() {
        return (
            <div>
                <section className="center green lighten-1 stats header">
                    <h5 className="white-text">{Labels.TITLE}</h5>
                    <h6 className="white-text subtitle">{Labels.SUBTITLE}</h6>
                </section>

                <div className="container">
                    <div className="section">
                        <h5 className="label">{Labels.SUPPORT}</h5>
                        {Labels.MISSION_JSX}
                    </div>
                </div>
            </div>
        );
    }
}
