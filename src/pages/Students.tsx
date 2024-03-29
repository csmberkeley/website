import React from "react";
import * as Labels from "../labels/StudentLabels";
import dates from "../data/dates.json";

export default class Students extends React.Component {
    isApplicationOpen() {
        const now = new Date();
        return (
            now > new Date(dates.interestFormOpen) &&
            now < new Date(dates.interestFormClose)
        );
    }

    render() {
        return (
            <div>
                <section className="center green lighten-1 stats header">
                    <h5 className="white-text">{Labels.TITLE}</h5>
                    <h6 className="white-text subtitle">{Labels.SUBTITLE}</h6>
                </section>

                <div className="container">
                    <div className="section">
                        <div className="col l8 offset-l2 s10 offset-s1">
                            <h5 className="label">
                                {Labels.SECTIONS.SUPPORT.LABEL}
                            </h5>
                            <p className="info">
                                {Labels.SECTIONS.SUPPORT.BODY}
                            </p>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                        <h5 className="label">
                            {Labels.SECTIONS.EXPECTATIONS.LABEL}
                        </h5>
                        {Labels.SECTIONS.EXPECTATIONS.BODY_JSX}
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                        {this.isApplicationOpen() ? (
                            <div>
                                <h5 className="label">
                                    {Labels.SECTIONS.APPLICATIONS_OPEN.LABEL}
                                </h5>
                                {Labels.SECTIONS.APPLICATIONS_OPEN.BODY_JSX}
                            </div>
                        ) : (
                            <div>
                                <h5 className="label">
                                    {Labels.SECTIONS.APPLICATIONS_CLOSE.LABEL}
                                </h5>
                                {Labels.SECTIONS.APPLICATIONS_CLOSE.BODY_JSX}
                            </div>
                        )}
                    </div>
                    <div className="divider"></div>
                    <div className="faq section">
                        <h5 className="label">{Labels.FAQ.LABEL}</h5>

                        <h6 className="sublabel">
                            {Labels.FAQ.DEADLINE_PASSED.Q}
                        </h6>
                        <p className="info">{Labels.FAQ.DEADLINE_PASSED.A}</p>

                        <h6 className="sublabel">{Labels.FAQ.UNITS.Q}</h6>
                        <p className="info">{Labels.FAQ.UNITS.A}</p>

                        <h6 className="sublabel">{Labels.FAQ.CONTACT.Q}</h6>
                        {Labels.FAQ.CONTACT.A_JSX}
                    </div>
                </div>
            </div>
        );
    }
}
