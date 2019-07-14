import React from "react";
import { Link } from "react-router-dom";

export default class Students extends React.Component {
    render() {
        return (
            <div>
                <section className="center green lighten-1 stats header">
                    <h5 className="white-text">For Students</h5>
                    <h6 className="white-text subtitle">
                        Learn in a personal environment from experienced
                        students at UC Berkeley for CS 61A, CS 88, CS 61B, CS
                        61C, CS 70, and EE 16A.
                    </h6>
                </section>

                <div className="container">
                    <div className="section">
                        <div className="col l8 offset-l2 s10 offset-s1">
                            <h5 className="label">Support</h5>
                            <p className="info">
                                CSM offers group tutoring to all students in
                                these four classes. Students are sorted into one
                                of the timeslots of their preference. Session
                                are held weekly, in the same room typically in
                                Soda or Cory, for 1 hour to 90 minutes during
                                times ranging from 9:00 AM to 7:00 PM. Mentors
                                will go over a worksheet in section with extra
                                problems to be worked on in groups. Homework,
                                lab, and project help will not be provided
                                during these sessions.
                            </p>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                        <h5 className="label">Expectations</h5>
                        <p className="info">
                            Students enrolled in group tutoring are eligible for
                            1 unit of P/NP credit. Grades are based on
                            attendance. Those attending the session for a grade
                            are required to attend 90% of weekly assigned
                            sessions.
                        </p>
                        <p className="info">
                            More in-depth{" "}
                            <a
                                href="https://docs.google.com/document/d/1gJpIJ5LhrRkR7aazMVRrklaXshAvx7IdfMSUQ-ig1yw/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                expectations here
                            </a>
                            .
                        </p>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                        <h5 className="label">Application Process</h5>
                        <p className="info">
                            Check out our{" "}
                            <Link
                                to="/scheduler"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Scheduler
                            </Link>{" "}
                            website around 2 weeks into the semester to sign up!
                            Create an account, confirm your email, select a
                            class, and enroll in a empty section.
                        </p>
                    </div>
                    <div className="divider"></div>
                    <div className="faq section">
                        <h5 className="label">FAQ</h5>

                        <h6 className="sublabel">
                            The deadline to sign up has already passed, can I
                            still sign up?
                        </h6>
                        <p className="info">
                            Yes. CSM's biggest priority is reaching out to as
                            many students as we can. However, if you aren't
                            enrolled on Telebears, you will still be required to
                            regularly attend the specific section you are
                            assigned to.
                        </p>

                        <h6 className="sublabel">
                            Can I get units for attending a section?
                        </h6>
                        <p className="info">
                            Yes! Each student can receive 1 unit of P/NP credit.
                            We will provide you the appropriate CCN when the
                            time comes. You are not required to enroll. You must
                            attend 90% of your assigned weekly sessions in order
                            to pass.
                        </p>

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
