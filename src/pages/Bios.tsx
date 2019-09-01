import React from "react";
import { match, Link, Redirect } from "react-router-dom";

import "../styles/Bios.scss";
import * as Labels from "../labels/BioLabels";

import courses from "../data/courses.json";
import placeholderImg from "../img/bio_placeholder.png";
import exec_bios from "../data/bios/exec.json";

const LOWERCASE_COURSES = courses.map(s => s.toLowerCase());

interface BioObj {
    name: string;
    role: string;
    imgName?: string;
    details?: string;
}

const bios: { [course: string]: BioObj[] } = { exec: exec_bios };
LOWERCASE_COURSES.forEach(name => {
    bios[name] = [];
});

function getCoursePageTitleAndLabel(course: string) {
    let title = course === "exec" ? "Exec" : course.toUpperCase();
    return (
        <div className="col l8 offset-l2 s10 offset-s1">
            <h5 className="label">{title} Mentor Bios</h5>
            <p className="info">{Labels.bioPageSubtitle(title)}</p>
        </div>
    );
}

const BIO_PLACEHOLDER_TR = (
    <tr>
        <td>
            <img
                src={placeholderImg}
                style={{ marginTop: "8px" }}
                className="image"
                alt="Bios coming soon!"
            />
        </td>
        <td className="bio">
            <p className="label">Coming soon!</p>
            <p></p>
            {Labels.PLACEHOLDER_BIO_TEXT}
        </td>
    </tr>
);

class BioCourse extends React.Component<{ course: string }> {
    render() {
        let withPeoplePrefix = this.props.course !== "exec";
        let courseBios = bios[this.props.course];
        return (
            <table>
                <tbody>
                    {courseBios.length === 0
                        ? BIO_PLACEHOLDER_TR
                        : courseBios.map(bio => (
                              <tr key={bio.imgName}>
                                  <td>
                                      <img
                                          src={
                                              process.env.PUBLIC_URL +
                                              "/img/" +
                                              (withPeoplePrefix
                                                  ? "people/"
                                                  : "") +
                                              bio.imgName
                                          }
                                          onError={function(e) {
                                              (e.target as HTMLImageElement).src = placeholderImg;
                                          }}
                                          style={{ marginTop: "8px" }}
                                          className="image"
                                          alt={bio.name}
                                      />
                                  </td>
                                  <td className="bio">
                                      <p className="label">{bio.name}</p>
                                      <p>{bio.role}</p>
                                      {bio.details}
                                  </td>
                              </tr>
                          ))}
                </tbody>
            </table>
        );
    }
}

function renderCoursePage(course: string) {
    return course === "exec" || LOWERCASE_COURSES.includes(course) ? (
        <div className="container">
            <div className="section">
                {getCoursePageTitleAndLabel(course)}
                <div>
                    <BioCourse course={course} />
                </div>
            </div>
        </div>
    ) : (
        <Redirect to="/bios" />
    );
}

function renderHomePage() {
    return (
        <div className="container">
            <div className="section">
                <div className="col l8 offset-l2 s10 offset-s1">
                    <h5 className="label">Bios</h5>
                    <p className="info">{Labels.BIO_HOME_PAGE_DESCRIPTION}</p>
                    <div className="collection">
                        <Link to="/bios/exec" className="collection-item">
                            CSM Exec
                        </Link>
                        {LOWERCASE_COURSES.map(name => (
                            <Link
                                key={name}
                                to={"/" + name}
                                className="collection-item"
                            >
                                {name.toUpperCase() + " Mentors"}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default class Bios extends React.Component<{
    match: match<{ course: string }>;
}> {
    render() {
        return this.props.match.params["course"]
            ? renderCoursePage(this.props.match.params["course"])
            : renderHomePage();
    }
}
