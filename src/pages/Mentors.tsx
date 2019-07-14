import React from "react";

class Mentors extends React.Component {
    render() {
        return (
            <div>
                <section className="center green lighten-1 stats header">
                    <h5 className="white-text">For Mentors</h5>
                    <h6 className="white-text subtitle">
                        Gain experience tutoring a small group of students in
                        the introductory computer science courses as a Junior
                        Mentor.
                    </h6>
                </section>

                <div className="container">
                    <div className="section">
                        <div className="col l8 offset-l2 s10 offset-s1">
                            <h5 className="label">Responsibilities</h5>
                            <p className="info">
                                All mentors are in charge of a group of 4-5
                                students.
                            </p>
                            <p className="info">
                                <b>Junior Mentors</b> are under the wing of a
                                pair of <b>Senior Mentors</b> who meet with them
                                and a group of 4-5 other Junior Mentors once a
                                week.
                            </p>
                            <p className="info">
                                <b>Senior Mentors</b> run these meetings, going
                                over guidance on the week’s material, teaching
                                tips, etc.
                            </p>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="divider"></div>
                    {/* TODO set this by js stuff */}
                    <div
                        className="section"
                        ng-controller="MentorsController as mentorsCtrl"
                    >
                        <div ng-if="applicationsOpen">
                            <h5 className="label">
                                Applications for Fall 2019 Junior Mentors and
                                Associate Mentors are now open!
                            </h5>
                            <p className="info">
                                We are currently recruiting mentors for CS 61A,
                                CS 88, CS 61B, CS 61C, CS 70, EE 16A, and EE16B
                                (newly added!).
                                <br />
                                The Junior Mentor and Associate Mentor
                                application is available at{" "}
                                <a href="https://forms.gle/kpof18tQXJbWX6417">
                                    https://forms.gle/kpof18tQXJbWX6417
                                </a>
                                . Applications are due 11:59 pm, August 18,
                                2019. More information is in the application,
                                and no late applications will be accepted.
                            </p>
                            <p className="info">
                                We are not opening Senior Mentor positions at
                                this time. We look forward to reading your
                                application!
                            </p>
                        </div>
                        <div ng-if="!applicationsOpen">
                            <h6 className="sublabel">
                                Applications have closed for this semester;
                                check back at the end of the semester!
                            </h6>
                        </div>
                        <br />
                    </div>
                    <div className="divider"></div>
                    <div className="faq section">
                        <h5 className="label">FAQ</h5>

                        <h6 className="sublabel">
                            What are you looking for in a Junior Mentor?
                        </h6>
                        <p className="info">
                            We look for applicants who are dedicated to their
                            students. This could be in the form of previous
                            tutoring experience, mastery of the material, and
                            flexible time commitments. While we do take grades
                            into account, it is not a prioritized metric. Many
                            successful mentors have received a variety of
                            grades.
                        </p>

                        <h6 className="sublabel">
                            Are there any prerequisites to be a Junior Mentor?
                        </h6>
                        <p className="info">
                            There are no formal requirements, but we prefer
                            mentors to have had at least one semester of lab
                            assisting, either in past semesters or concurrently.
                        </p>

                        <h6 className="sublabel">
                            What is the time commitment for a Junior Mentor?
                        </h6>
                        <p className="info">
                            We estimate 3-4 hours/week. We break it down as
                            follows: Senior Meeting (1 hour), Tutoring Meeting
                            (1 hour), Other Preparations: 1-2 hours.
                        </p>

                        <h6 className="sublabel">
                            Can I be a junior mentor without meeting with a
                            senior mentor?
                        </h6>
                        <p className="info">
                            You may. We have another category of mentor called
                            “Associate Mentor” in which you have extensive
                            experience in the class you’re mentoring for. We
                            will be more strict with acceptances as an Associate
                            Mentor and generally encourage first time tutors to
                            be a Junior Mentor and receive guidance from Senior
                            Mentors.
                        </p>

                        <h6 className="sublabel">
                            Can I get units for being a mentor?
                        </h6>
                        <p className="info">
                            Yes! Each Junior Mentor can receive 1 unit of P/NP
                            credit. We will provide you the appropriate CCN when
                            the time comes. You are not required to enroll.
                        </p>

                        <h6 className="sublabel">
                            Can I also do other forms of tutoring other than
                            group?
                        </h6>
                        <p className="info">
                            Junior Mentors’ primary responsibility is to host
                            group tutoring. However, Junior Mentors may also
                            choose to do 1-1 tutoring in conjunction with CS 98,
                            Introduction to Teaching Computer Science. For other
                            forms of support, you are free to lab assist or
                            assist in office hours or guerrilla sections,
                            provided you have received a passing grade in your
                            respective class.
                        </p>

                        <h6 className="sublabel">What is this CS 370?</h6>
                        <p className="info">
                            CS 370, or CS 98, Introduction to Teaching Computer
                            Science, is a class for aspiring teachers, providing
                            guidance to lab assistants on how to teach computer
                            science and put it into practice. It offers 1-1
                            tutoring for the class of your choice. Many of our
                            mentors have taken this class concurrently or
                            previously, and is highly recommended!
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

export default Mentors;
