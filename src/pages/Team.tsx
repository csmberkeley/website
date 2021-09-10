import React from "react";

import "../styles/Team.scss";
import placeholderImg from "../img/bio_placeholder.png";

// TODO if it ever becomes necessary, refactor these semesters out into their own module
import fa17 from "../data/team/fa17.json";
import sp18 from "../data/team/sp18.json";
import fa18 from "../data/team/fa18.json";
import sp19 from "../data/team/sp19.json";
import fa19 from "../data/team/fa19.json";
import sp20 from "../data/team/sp20.json";
import fa20 from "../data/team/fa20.json";
import sp21 from "../data/team/sp21.json";
import fa21 from "../data/team/fa21.json";

import { duties } from "../labels/TeamLabels";
import * as utils from "./utils";

const CURRENT_SEM = "fa21";
// TODO display older of these in a dropdown maybe?
const SEMESTERS = [
    "fa17",
    "sp18",
    "fa18",
    "sp19",
    "fa19",
    "sp20",
    "fa20",
    "sp21",
    "fa21",
].slice(-4);

interface NewOfficer {
    kind: "new";
    name: string;
    imgUrl: string; // External URL
    position: string;
}

interface OldOfficer {
    kind: "old";
    name: string;
    img: string; // Internal relative path
    position: string;
}

// We used to download officer images, and serve them from the OCF website: I say NO MORE
// (now we serve straight from Google Drive)
type Officer = OldOfficer | NewOfficer;

function getOfficerTeamFromSemStr(semester: string): Officer[] {
    // May be prudent to move the semester imports into a module, but for now,
    // https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
    let newDiscriminator = (o: any) => Object.assign(o, { kind: "new" });
    let oldDiscriminator = (o: any) => Object.assign(o, { kind: "old" });
    switch (semester) {
        case "fa17":
            return fa17.map(oldDiscriminator);
        case "sp18":
            return sp18.map(oldDiscriminator);
        case "fa18":
            return fa18.map(oldDiscriminator);
        case "sp19":
            return sp19.map(oldDiscriminator);
        case "fa19":
            return fa19.map(newDiscriminator);
        case "sp20":
            return sp20.map(newDiscriminator);
        case "fa20":
            return fa20.map(newDiscriminator);
        case "sp21":
            return sp21.map(newDiscriminator);
        case "fa21":
            return fa21.map(newDiscriminator);
        default:
            throw new Error(`Bad semester provided: ${semester}`);
    }
}

function getLongSemNameFromSemStr(semester: string): string {
    if (semester.match(/(fa|sp)[0-9][0-9]/)) {
        let shortSem = semester.substring(0, 2);
        let shortYear = semester.substring(2);
        let longSem = shortSem === "fa" ? "Fall" : "Spring";
        // As long as this code isn't used a century from now, we'll be ok here
        let longYear = "20" + shortYear;
        return `${longSem} ${longYear}`;
    } else {
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
    render() {
        return (
            <div className="col s10 offset-s1 team-display">
                {getOfficerTeamFromSemStr(this.props.semester).map(officer => (
                    <div
                        className="member col l3 m4 s12"
                        key={
                            officer.name +
                            this.props.semester +
                            officer.position
                        }
                    >
                        <div className="cube-scene">
                            <div className="cube">
                                <div className="unflipped">
                                    <img
                                        className="responsive-img"
                                        src={
                                            officer.kind === "old"
                                                ? process.env.PUBLIC_URL +
                                                  "/img/team/" +
                                                  officer.img
                                                : utils.getEmbeddableDriveImageLink(
                                                      officer.imgUrl
                                                  )
                                        }
                                        alt={officer.name}
                                        onError={function (e) {
                                            (e.target as HTMLImageElement).src = placeholderImg;
                                        }}
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
                                key={sem}
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
