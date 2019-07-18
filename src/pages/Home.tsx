import { CountUp } from "countup.js";
import React from "react";
import { Link } from "react-router-dom";

import "../styles/Home.scss";
import * as Labels from "../labels/HomeLabels";

import courses from "../data/courses.json";
import stats from "../data/stats.json";

import goldmanLogo from "../img/sponsors/goldman-sachs.png";
import mckinseyLogo from "../img/sponsors/mckinsey.png";

// Describes a word that gets loaded in by fade
interface LoadingWord {
    text: string;
    loaded: boolean;
    // The delay between the render of this and the next word
    delay: number;
    // If not null, an action to be taken after the word loads (e.g. changing a CSS class)
    action?: Function;
}

class CourseList extends React.Component<{ words: LoadingWord[] }> {
    render() {
        return (
            <div className="row courses">
                {this.props.words.map((loadingWord, i) => (
                    <div
                        key={loadingWord.text}
                        className={"col s12 " + (i < 3 ? "m4" : "m3")}
                    >
                        <h4
                            className={
                                "animate " +
                                (loadingWord.loaded ? "onload" : "")
                            }
                        >
                            {loadingWord.text}
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
            duration: 2,
            useEasing: true,
            useGrouping: true,
            separator: ",",
            decimal: ".",
            prefix: "",
            suffix: "",
        };
        new CountUp("student-count", stats.studentCount, options).start();
        new CountUp("mentor-count", stats.mentorCount, options).start();
        new CountUp(
            "rating-count",
            stats.rating,
            Object.assign({ decimalPlaces: 1 }, options)
        ).start();
        new CountUp("return-count", stats.returnCount, options).start();
    }

    render() {
        return (
            <div className={"stats" + (this.props.loaded ? " onload" : "")}>
                <h5 className="white-text">
                    <span id="student-count">{stats.studentCount}</span>+{" "}
                    { Labels.STAT_DESCRIPTIONS.STUDENT_COUNT }
                </h5>
                <h5 className="white-text">
                    <span id="mentor-count">{stats.mentorCount}</span>+{" "}
                    { Labels.STAT_DESCRIPTIONS.MENTOR_COUNT }
                </h5>
                <h5 className="white-text">
                    { Labels.STAT_DESCRIPTIONS.AVG_MENTOR_RATING }{" "}
                    <span id="rating-count">{stats.rating}</span>/ 5
                </h5>
                <h5 className="white-text">
                    <span id="return-count">{stats.returnCount}</span>%{" "}
                    { Labels.STAT_DESCRIPTIONS.RETURN_PCT }
                </h5>
            </div>
        );
    }
}

class Title extends React.Component<{
    words: LoadingWord[];
    subintroLoaded: boolean;
}> {
    render() {
        return (
            <div
                style={{
                    marginTop: "6rem",
                    marginBottom: "6rem",
                }}
            >
                <div className="intro">
                    {this.props.words.map(loadingWord => (
                        <span
                            className={
                                "animate" +
                                (loadingWord.loaded ? " onload" : "")
                            }
                            key={loadingWord.text}
                        >
                            {loadingWord.text}
                        </span>
                    ))}
                </div>
                <div
                    className={
                        "animate subintro" +
                        (this.props.subintroLoaded ? " onload" : "")
                    }
                >
                    { Labels.COVER_SUBTITLE }
                </div>
            </div>
        );
    }
}

// Mild hack: in order to animate cover darkening etc. that are reliant on CSS classes
// being applied, we pretend they're LoadingWords with empty strings
enum TextlessAnimation {
    Subintro,
    CoverLightened, // Darken is kind of a misleading name, because it actually lightens
    StatsLoaded,
}
interface AnimationState {
    nextIndex: number;
    animations: LoadingWord[];
    textlessAnimationsLoaded: Set<TextlessAnimation>;
}

class Home extends React.Component<{}, AnimationState> {
    titleWords: LoadingWord[];
    courseWords: LoadingWord[];

    constructor(props: {}) {
        super(props);
        this.titleWords = [
            { text: "We ", loaded: false, delay: 500 },
            { text: "are ", loaded: false, delay: 500 },
            { text: "CSM", loaded: false, delay: 0 },
        ];
        this.courseWords = courses.map(courseName => ({
            text: courseName,
            loaded: false,
            delay: 250,
        }));
        const createLoadAnimation = (
            animation: TextlessAnimation,
            delay: number
        ): LoadingWord => ({
            text: "",
            loaded: false,
            delay: delay,
            action: () =>
                this.setState(state => {
                    let textlessAnimationsLoaded =
                        state.textlessAnimationsLoaded;
                    textlessAnimationsLoaded.add(animation);
                    return { textlessAnimationsLoaded };
                }),
        });
        this.state = {
            animations: this.titleWords
                .concat([
                    createLoadAnimation(TextlessAnimation.CoverLightened, 500),
                    createLoadAnimation(TextlessAnimation.Subintro, 500),
                ])
                .concat(this.courseWords)
                .concat([
                    createLoadAnimation(TextlessAnimation.StatsLoaded, 550),
                ]),
            nextIndex: 0,
            textlessAnimationsLoaded: new Set(),
        };
    }

    componentDidMount() {
        // Feels oddly like a y-combinator
        let startNextAnimationTimer: Function;
        startNextAnimationTimer = (delay: number) =>
            this.setState(state => {
                if (state.nextIndex >= state.animations.length) {
                    return state;
                }
                let word = state.animations[state.nextIndex];
                word.loaded = true;
                if (word.action) {
                    word.action();
                }
                // TODO lift this out of the setstate call somehow
                setTimeout(
                    () => startNextAnimationTimer(word.delay),
                    word.delay
                );
                // Cast result to satisfy typescript: apparently the sublime plugin isn't quite up to date?
                return {
                    nextIndex: state.nextIndex + 1,
                } as AnimationState;
            });
        startNextAnimationTimer(0);
    }

    render() {
        return (
            <div>
                <div className="cover-container">
                    <div className="cover">
                        <div className="text-container">
                            <Title
                                words={this.titleWords}
                                subintroLoaded={this.state.textlessAnimationsLoaded.has(
                                    TextlessAnimation.Subintro
                                )}
                            />
                            <CourseList words={this.courseWords} />
                            <StatsList
                                loaded={this.state.textlessAnimationsLoaded.has(
                                    TextlessAnimation.StatsLoaded
                                )}
                            />
                        </div>
                    </div>
                    <div className="cover-img"></div>
                    <div
                        className={
                            "cover-darken" +
                            (this.state.textlessAnimationsLoaded.has(
                                TextlessAnimation.CoverLightened
                            )
                                ? " onload"
                                : "")
                        }
                    ></div>
                </div>
                <section className="three-column">
                    <div className="container">
                        <div className="row">
                            <div className="col m6">
                                <h5 className="label">{ Labels.WHAT_IS_CSM.LABEL }</h5>
                                <p className="info">
                                    { Labels.WHAT_IS_CSM.BODY }
                                </p>
                            </div>
                            <div className="col m6">
                                <h5 className="label">{ Labels.WHO_WE_ARE.LABEL }</h5>
                                { Labels.WHO_WE_ARE.BODY_JSX }
                            </div>
                        </div>
                        <br />
                        <div className="row center">
                            <div className="col m6 s10 offset-s1">
                                <h5>{ Labels.QUICK_LINKS.JOIN_SECTION.LABEL }</h5>
                                <Link
                                    to="/students"
                                    className="waves-effect waves-light green lighten-1 btn"
                                >
                                    { Labels.QUICK_LINKS.JOIN_SECTION.BUTTON }
                                </Link>
                            </div>
                            <div className="col m6 s10 offset-s1">
                                <h5>{ Labels.QUICK_LINKS.BECOME_MENTOR.LABEL }</h5>
                                <Link
                                    to="/mentors"
                                    className="waves-effect waves-light green lighten-1 btn"
                                >
                                    { Labels.QUICK_LINKS.BECOME_MENTOR.BUTTON }
                                </Link>
                            </div>
                        </div>
                        {/* sponsors */}
                        <div className="section">
                            <h5 className="label">{ Labels.PARTNER_SUBHEADING }</h5>
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
                                    <h5>{ Labels.QUICK_LINKS.BECOME_PARTNER.LABEL }</h5>
                                    <Link
                                        to="/partners"
                                        className="waves-effect waves-light green lighten-1 btn"
                                    >
                                        { Labels.QUICK_LINKS.BECOME_PARTNER.BUTTON }
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
                                { Labels.LIKE_US_ON_FB }
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
