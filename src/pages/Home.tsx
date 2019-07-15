
import { CountUp } from "countup.js";
import React from "react";
import { Link } from "react-router-dom";

import "../styles/Home.scss";

import courses from "../data/courses.json";
import stats from "../data/stats.json";

import goldmanLogo from "../img/sponsors/goldman-sachs.png";
import mckinseyLogo from "../img/sponsors/mckinsey.png";

// Describes a word that gets loaded in by fade -_-
interface LoadingWord {
    text: string;
    loaded: boolean;
    // The delay between the render of this and the next word
    delay: number;
}

class CourseList extends React.Component<{ words: LoadingWord[] }> {
    render() {
        return (
            <div className="row courses">
                { this.props.words.map((loadingWord, i) => (
                    <div key={ loadingWord.text } className={ "col s12 " + (i < 3 ? "m4" : "m3") }>
                        <h4 className={ "animate " + (loadingWord.loaded ? "onload" : "") }>
                            { loadingWord.text }
                        </h4>
                    </div>
                ))}
            </div>
        );
    }
}

class StatsList extends React.Component<{ loaded: boolean }> {
    componentDidUpdate() {
        // Do animation thing where numbers count up
        const options = {
            "duration": 2,
            "useEasing": true,
            "useGrouping": true,
            "separator": ",",
            "decimal": ".",
            "prefix" : "",
            "suffix" : "",
        };
        new CountUp("student-count", stats.studentCount, options).start();
        new CountUp("mentor-count", stats.mentorCount, options).start();
        new CountUp("rating-count", stats.rating, Object.assign({ "decimalPlaces": 1 }, options)).start();
        new CountUp("return-count", stats.returnCount, options).start();
    }

    render() {
        return (
            <div className={ "stats" + (this.props.loaded ? " onload" : "") }>
                <h5 className="white-text">
                    <span id="student-count">{ stats.studentCount }</span>+
                    Students Serviced
                </h5>
                <h5 className="white-text">
                    <span id="mentor-count">{ stats.mentorCount }</span>+ Mentors
                </h5>
                <h5 className="white-text">
                    Average mentor rating:
                    <span id="rating-count">{ stats.rating }</span>/ 5
                </h5>
                <h5 className="white-text">
                    <span id="return-count">{ stats.returnCount }</span>% would
                    come back to a CSM session
                </h5>
            </div>
        );
    }
}

class Title extends React.Component<{ words: LoadingWord[] }> {
    render() {
        return (
            <div
                style={{
                    marginTop: "6rem",
                    marginBottom: "6rem",
                }}
            >
                <div className="intro">
                    {
                        this.props.words.map(loadingWord => (
                            <span className={ "animate" + (loadingWord.loaded ? " onload" : "") } key={ loadingWord.text }>
                                { loadingWord.text }
                            </span>
                        ))
                    }
                </div>
                <div className="animate subintro">
                    Computer Science Mentors for introductory
                    electrical engineering and computer science
                    courses at UC Berkeley
                </div>
            </div>
        )
    }
}

interface AnimationState {
    nextIndex: number;
    words: LoadingWord[];
    statsLoaded: boolean;
}

class Home extends React.Component<{}, AnimationState> {
    titleWords: LoadingWord[];
    courseWords: LoadingWord[];

    constructor(props: {}) {
        super(props);
        this.titleWords = [
            { "text": "We", "loaded": false, "delay": 500 },
            { "text": "are", "loaded": false, "delay": 500 },
            { "text": "CSM", "loaded": false, "delay": 500 },
        ];
        this.courseWords = courses.map(courseName => ({
                "text": courseName,
                "loaded": false,
                "delay": 250,
            })
        );
        this.state = { "words": this.titleWords.concat(this.courseWords), "nextIndex": 0, "statsLoaded": false };
    }

    componentDidMount() {
        const onAnimationEnd = () => // Hack to get stats to load with delay
            setTimeout(
                () => this.setState(() => ({ "statsLoaded": true })),
                800
            );
        // Feels oddly like a y-combinator
        let startNextAnimationTimer: Function;
        startNextAnimationTimer = (delay: number) =>
            this.setState(state => {
                if (state.nextIndex >= state.words.length) {
                    onAnimationEnd();
                    return state;
                }
                let words = state.words;
                words[state.nextIndex].loaded = true;
                setTimeout(() => startNextAnimationTimer(words[state.nextIndex].delay), delay);
                return {
                    "words": words,
                    "nextIndex": state.nextIndex + 1,
                    "statsLoaded": false,
                };
            });
        startNextAnimationTimer(0);
    }

    render() {
        return (
            <div>
                <div className="cover-container">
                    <div className="cover">
                        <div className="text-container">
                            <Title words={ this.titleWords }/>
                            <CourseList words={ this.courseWords }/>
                            <StatsList loaded={ this.state.statsLoaded }/>
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
