import React from "react";

import "../styles/Mentors.scss";
import * as Labels from "../labels/MentorLabels";

import dates from "../data/dates.json";

export default class Mentors extends React.Component {
    isApplicationOpen() {
        const now = new Date();
        return (
            now > new Date(dates.applicationsOpen) &&
            now < new Date(dates.applicationsClose)
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
                                {Labels.SECTIONS.RESPONSIBILITIES.LABEL}
                            </h5>
                            {Labels.SECTIONS.RESPONSIBILITIES.BODY_JSX}
                        </div>
                    </div>
                    <div className="divider"></div>
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
                                <h6 className="sublabel">
                                    {Labels.SECTIONS.APPLICATIONS_CLOSED.LABEL}
                                </h6>
                            </div>
                        )}
                        <br />
                    </div>
                    <div className="divider"></div>
                    <div className="faq section">
                        <h5 className="label">{Labels.FAQ.LABEL}</h5>

                        <h6 className="sublabel">
                            {Labels.FAQ.JM_QUALITIES.Q}
                        </h6>
                        <p className="info">{Labels.FAQ.JM_QUALITIES.A}</p>

                        <h6 className="sublabel">{Labels.FAQ.JM_PREREQS.Q}</h6>
                        <p className="info">{Labels.FAQ.JM_PREREQS.A}</p>

                        <h6 className="sublabel">
                            {Labels.FAQ.JM_COMMITMENT.Q}
                        </h6>
                        <p className="info">{Labels.FAQ.JM_COMMITMENT.A}</p>
                        <h6 className="sublabel">{Labels.FAQ.JM_UNITS.Q}</h6>
                        <p className="info">{Labels.FAQ.JM_UNITS.A}</p>

                        <h6 className="sublabel">
                            {Labels.FAQ.OTHER_TUTORING.Q}
                        </h6>
                        <p className="info">{Labels.FAQ.OTHER_TUTORING.A}</p>

                        <h6 className="sublabel">{Labels.FAQ.CS_370.Q}</h6>
                        <p className="info">{Labels.FAQ.CS_370.A}</p>

                        <h6 className="sublabel">
                            Who can I contact if I have more questions?
                        </h6>
                        <p className="info">
                            Feel free to email us at{" "}
                            <a href="MAILTO:mentors@berkeley.edu">
                                mentors@berkeley.edu
                            </a>{" "}
                            if you have any questions or concerns!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
