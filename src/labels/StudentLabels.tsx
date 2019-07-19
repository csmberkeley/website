import React from "react";
import { Link } from "react-router-dom";

import { COURSE_STRING_WITH_AND, FAQ_CONTACT } from "./common";

export const TITLE = "For Students";
export const SUBTITLE = "Learn in a personal environment from experienced students at UC Berkeley " +
                        `for ${COURSE_STRING_WITH_AND}.`

export const SECTIONS = {
    SUPPORT: {
        LABEL: "Support",
        BODY: "CSM offers group tutoring to all students in these four classes. Students are " +
              "sorted into one of the timeslots of their preference. Session are held weekly, in " +
              "the same room typically in Soda or Cory, for 1 hour to 90 minutes during times " +
              "ranging from 9:00 AM to 7:00 PM. Mentors will go over a worksheet in section with " +
              "extra problems to be worked on in groups. Homework, lab, and project help will not " +
              "be provided during these sessions.",
    },
    EXPECTATIONS: {
        LABEL: "Expectations",
        BODY_JSX: (
            <span>
                <p className="info">
                    Students enrolled in group tutoring are eligible for 1 unit of P/NP credit.
                    Grades are based on attendance. Those attending the session for a grade are
                    required to attend 90% of weekly assigned sessions.
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
            </span>
        ),
    },
    APPLICATION: {
        LABEL: "Application Process",
        BODY_JSX: (
            <p className="info">
                Check out our{" "}
                <Link
                    to="/scheduler"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Scheduler
                </Link>{" "}
                website around 2 weeks into the semester to sign up! Create an account, select a
                class, and enroll in a empty section.
            </p>
        )
    }
}

export const FAQ = {
    LABEL: "FAQ",
    DEADLINE_PASSED: {
        Q: "The deadline to sign up has already passed, can I still sign up?",
        A: "Yes. CSM's biggest priority is reaching out to as many students as we can. However, " +
           "if you aren't enrolled on Calcentral, you will still be required to regularly attend " +
           "the specific section you are assigned to."
    },
    UNITS: {
        Q: "Can I get units for attending a section?",
        A: "Yes! Each student can receive 1 unit of P/NP credit. We will provide you the " +
           "appropriate CCN when the time comes. You are not required to enroll. You must attend " +
           "90% of your assigned weekly sessions in order to pass."
    },
    CONTACT: FAQ_CONTACT,    
}