import React from "react";

import "../styles/Team.scss";

// TODO if it ever becomes necessary, refactor these semesters out into their own module
import fa17 from "../data/team/fa17.json";
import sp18 from "../data/team/sp18.json";
import fa18 from "../data/team/fa18.json";
import sp19 from "../data/team/sp19.json";

import { duties } from "../labels/TeamLabels";

const CURRENT_SEM = "sp19";
const SEMESTERS = ["fa17", "sp18", "fa18", "sp19"];

interface Officer {
    name: string;
    img: string;
    position: string;
}

function getOfficerTeamFromSemStr(semester: string): Officer[] {
    switch (semester) {
        case "fa17":
            return fa17;
        case "sp18":
            return sp18;
        case "fa18":
            return fa18;
        case "sp19":
            return sp19;
        default:
            throw new Error(`Bad semester provided: ${semester}`);
    }
}

function getLongSemNameFromSemStr(semester: string): string {
    switch (semester) {
        case "fa17":
            return "Fall 2017";
        case "sp18":
            return "Spring 2018";
        case "fa18":
            return "Fall 2018";
        case "sp19":
            return "Spring 2019";
        default:
            throw new Error(`Bad semester provided: ${semester}`);
    }
}

class SemesterHeaderLink extends React.Component<{
    semester: string;
    activeSemester: string;
    switchActiveTeam: Function;
}> {
    render() {
        return (
            <span
                key={this.props.semester}
                className={
                    "team-title" +
                    (this.props.semester !== this.props.activeSemester
                        ? " team-title-inactive"
                        : "")
                }
                onClick={() => this.props.switchActiveTeam(this.props.semester)}
            >
                {getLongSemNameFromSemStr(this.props.semester)} Team
            </span>
        );
    }
}

class SemesterTeam extends React.Component<{ semester: string }> {

    constructor(props: { semester: string }) {
        super(props);
    }

    render() {
        return (
            <div className="col s10 offset-s1 team-display">
                {getOfficerTeamFromSemStr(this.props.semester).map(officer => (
                    <div
                        className="member col l3 m4 s12"
                        key={officer.name + this.props.semester}
                    >
                        <div className="cube-scene">
                            <div className="cube">
                                <div className="unflipped">
                                    <img
                                        className="responsive-img"
                                        width="200px"
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/img/team/" +
                                            officer.img
                                        }
                                    />
                                </div>
                                <div className="flipped">
                                    <div className="cube-title">
                                        {officer.position}
                                    </div>
                                    <div className="cube-text">
                                        {" "}
                                        {duties(officer.position)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="member-name">{officer.name}</p>
                        <p className="member-position">{officer.position}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default class Team extends React.Component<{}, { activeSem: string }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeSem: CURRENT_SEM,
        };
        this.switchActiveTeam = this.switchActiveTeam.bind(this);
    }

    switchActiveTeam(sem: string) {
        this.setState({ activeSem: sem });
    }

    render() {
        return (
            <section className="row center team">
                <h5 className="subtitle">
                    {SEMESTERS.slice()
                        .reverse()
                        .map((sem, i) => [
                            // intersperse space https://stackoverflow.com/a/40276830
                            i > 0 && " | ",
                            <SemesterHeaderLink
                                semester={sem}
                                activeSemester={this.state.activeSem}
                                switchActiveTeam={this.switchActiveTeam}
                            />,
                        ])}
                </h5>
                <h6 className="center-align">
                    Hover over photos for more info!
                </h6>
                <br />
                <SemesterTeam semester={this.state.activeSem} />
            </section>
        );
    }
}
