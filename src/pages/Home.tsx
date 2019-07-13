import React from "react";
import { Link } from "react-router-dom";

import "../styles/Home.scss";

import courses from "../data/courses.json";

import goldmanLogo from "../img/sponsors/goldman-sachs.png";
import mckinseyLogo from "../img/sponsors/mckinsey.png";

class Course extends React.Component<{ name: string; index: number }> {
    render() {
        return (
            <div key={this.props.name} className="col s12 m4">
                <h4 className="animate" id={"course" + this.props.index}>
                    {this.props.name}
                </h4>
            </div>
        );
    }
}

class CourseList extends React.Component {
    render() {
        return (
            <div className="row courses">
                {courses.map((name, i) => (
                    <Course name={name} index={i} />
                ))}
                ;
            </div>
        );
    }
}

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="cover-container">
                    <div className="cover">
                        <div className="text-container">
                            <div
                                style={{
                                    marginTop: "6rem",
                                    marginBottom: "6rem",
                                }}
                            >
                                <div className="intro">
                                    <span className="animate" id="intro">
                                        We are CSM
                                    </span>
                                </div>
                                <div className="animate subintro">
                                    Computer Science Mentors for introductory
                                    electrical engineering and computer science
                                    courses at UC Berkeley
                                </div>
                            </div>
                            <CourseList />
                            <div className="stats">
                                <h5 className="white-text">
                                    <span id="student-count">1100</span>+
                                    Students Serviced
                                </h5>
                                <h5 className="white-text">
                                    <span id="mentor-count">200</span>+ Mentors
                                </h5>
                                <h5 className="white-text">
                                    Average mentor rating:
                                    <span id="rating-count">4.6</span>/ 5
                                </h5>
                                <h5 className="white-text">
                                    <span id="return-count">93</span>% would
                                    come back to a CSM session
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="cover-img"></div>
                    {/* <div className="cover-darken"></div> */}
                </div>
                <section className="three-column">
                    <div className="container">
                        <div className="row">
                            <div className="col m6">
                                <h5 className="label">What is CSM?</h5>
                                <p className="info">
                                    CSM is a student-run organization that
                                    provides guidance and resources in a smaller
                                    classroom environment through group tutoring
                                    sessions. Each section has 4-6 students and
                                    focuses on material from one of the courses
                                    listed above. Outside of teaching, our
                                    mentors watch movies, climb up to Soda
                                    almost everyday, hike, study together, and
                                    more!
                                </p>
                            </div>
                            <div className="col m6">
                                <h5 className="label">Who we are</h5>
                                <p className="info">
                                    We are a group of UC Berkeley students
                                    passionate about teaching and helping
                                    students succeed in computer science. CSM
                                    provides a tiered system of mentoring
                                    opportunities.
                                    <b>Senior Mentors</b> write material and
                                    provide tips to <b>Junior Mentors</b> on how
                                    to teach. All mentors meet up once a week to
                                    learn from each other, and use another time
                                    of the week to teach a section. Our{" "}
                                    <b>Associate Mentors</b> are either tutors,
                                    readers, or other experienced teachers who
                                    teach a section without a Senior Mentor.
                                </p>
                            </div>
                        </div>
                        <br />
                        <div className="row center">
                            <div className="col m6 s10 offset-s1">
                                <h5>Plan to join a section?</h5>
                                <Link
                                    to="/students"
                                    className="waves-effect waves-light green lighten-1 btn"
                                >
                                    Join
                                </Link>
                            </div>
                            <div className="col m6 s10 offset-s1">
                                <h5>Want to be a mentor?</h5>
                                <Link
                                    to="/mentors"
                                    className="waves-effect waves-light green lighten-1 btn"
                                >
                                    Apply
                                </Link>
                            </div>
                        </div>
                        {/* sponsors */}
                        <div className="section">
                            <h5 className="label">Our Partners</h5>
                            <div className="row">
                                <div className="col m3 s10 valign offset-s1">
                                    <img
                                        src={goldmanLogo}
                                        className="responsive-img"
                                        alt="Goldman Sachs"
                                    />
                                </div>
                                <div className="col m3 s10 valign offset-s1">
                                    <img
                                        src={mckinseyLogo}
                                        className="responsive-img"
                                        alt="McKinsey&amp;Company"
                                    />
                                </div>
                                <div className="col m6 s10 valign offset-s1 center">
                                    <h5>Want to work with us?</h5>
                                    <Link
                                        to="/partners"
                                        className="waves-effect waves-light green lighten-1 btn"
                                    >
                                        Partner
                                    </Link>
                                    <br />
                                </div>
                            </div>
                        </div>
                        {/* fb page link */}
                        <div className="row">
                            <a
                                className="waves-effect waves-light btn"
                                href="https://www.facebook.com/BerkeleyCSM/"
                            >
                                Give our Facebook page a like for updates and
                                events!
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
