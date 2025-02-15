import React from "react";
import { Link } from "react-router-dom";
import dates from "../data/dates.json"

import { COURSE_STRING_WITH_AND, FAQ_CONTACT } from "./common";

export const TITLE = "For Students";
export const SUBTITLE =
    "Learn in a personal environment from experienced students at UC Berkeley " +
    `for ${COURSE_STRING_WITH_AND}.`;

export const SECTIONS = {
    SUPPORT: {
        LABEL: "Support",
        BODY:
            "CSM offers group tutoring to all students in these seven classes. " +
            "Students can sign up for time slots on a first-come, first-serve basis. " +
            "Sessions are held once or twice a week, in Soda, Cory, or library rooms, " +
            "for 1 hour to 90 minutes during times ranging from 9:00 AM to 9:00 PM. " +
            "Mentors will go over a worksheet in section with extra problems to be worked " +
            "on in groups. Homework, lab, and project help will not be provided during these " +
            "sessions.",
    },
    EXPECTATIONS: {
        LABEL: "Expectations",
        BODY_JSX: (
            <span>
                <p className="info">
                    Students enrolled in group tutoring are eligible for 1 unit
                    of P/NP credit. Students will be given a P grade based on attendance. Those
                    attending the session for a grade are required to attend 90%
                    of weekly assigned sessions.
                </p>
                <p className="info">
                    More in-depth{" "}
                    <a
                        href="https://docs.google.com/document/d/1fmzgepezzdEzfi97u_jEw3OS88gsKDh7AjpuB4pnuLA/edit"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        expectations here
                    </a>
                    .
                </p>
            </span>
        ),
    },
    APPLICATIONS_CLOSE: {
        LABEL: "Enrollment Process",
        BODY_JSX: (
            <p className="info">
                Applications are currently closed for the {dates.applicationSemester} semester and will open 
                around 2 weeks into the semester. In the meantime, fill out{" "}
                <Link to="/interest">
                    this interest form
                </Link>{" "}
                if you plan on signing up for a section.
            </p>
        ),
    },
    APPLICATIONS_OPEN: {
        LABEL: "Enrollment Process",
        BODY_JSX: (
            <p className="info">
                Check out our{" "}
                <Link to="/scheduler" rel="noopener noreferrer" target="_blank">
                    Scheduler
                </Link>{" "}
                website around 2 weeks into the semester to sign up! Create an account, select
                a class, and enroll in a empty section. To sign up for a unit, you must do so
                seperately through CalCentral. More in depth instructions can be found{" "}
                <a
                  href="https://docs.google.com/document/d/1fmzgepezzdEzfi97u_jEw3OS88gsKDh7AjpuB4pnuLA/edit"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                    here
                </a>
                .
            </p>
        ),
    },
};

export const FAQ = {
    LABEL: "FAQ",
    DEADLINE_PASSED: {
        Q: "The deadline to sign up has already passed, can I still sign up?",
        A:
            "Yes! CSM's biggest priority is reaching out to as many students as we can. However, " +
            "even if you aren't enrolled on CalCentral, you will still be required to regularly " +
            "attend the specific section you are assigned to.",
    },
    UNITS: {
        Q: "Can I get units for attending a section?",
        A:
            "Yes! Each student can receive 1 unit of P/NP credit. We will provide you the " +
            "appropriate CCN after signups. You are not required to enroll. You must attend " +
            "90% of your assigned weekly sessions in order to pass. If you are enrolled in multiple " +
            "CSM sections, you may receive 1 unit for each, and must meet attendance requirements " +
            "for all your sections in order to pass.",
    },
    CONTACT: FAQ_CONTACT,
};
