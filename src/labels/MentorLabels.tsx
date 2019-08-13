import React from "react";
import { Link } from "react-router-dom";

import { COURSE_STRING_WITH_AND, FAQ_CONTACT } from "./common";
import dates from "../data/dates.json";

export const TITLE = "For Mentors";
export const SUBTITLE =
    "Gain experience tutoring a small group of students in the introductory " +
    "computer science courses as a Junior Mentor.";

export const SECTIONS = {
    RESPONSIBILITIES: {
        LABEL: "Responsibilities",
        BODY_JSX: (
            <span>
                <p className="info">
                    All mentors are in charge of a group of 4-5 students.
                </p>
                <p className="info">
                    <b>Junior Mentors</b> are under the wing of a pair of{" "}
                    <b>Senior Mentors</b> who meet with them and a group of 4-5
                    other Junior Mentors once a week.
                </p>
                <p className="info">
                    <b>Senior Mentors</b> run these meetings, going over
                    guidance on the week’s material, teaching tips, etc.
                </p>
            </span>
        ),
    },
    APPLICATIONS_OPEN: {
        LABEL: `Applications for ${dates.applicationSemester} Junior Mentors and Associate Mentors are now open!`,
        BODY_JSX: (
            <span>
                <p className="info">
                    We are currently recruiting mentors for{" "}
                    {COURSE_STRING_WITH_AND} (newly added!).
                    <br />
                    The{" "}
                    <Link to="/apply">
                        Junior Mentor and Associate Mentor application is
                        available now!
                    </Link>{" "}
                    Applications are due{" "}
                    {new Date(dates.applicationsClose).toLocaleString("en-US", {
                        day: "numeric",
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        hour: "numeric",
                        minute: "2-digit",
                    })}
                    . More information is in the application, and no late
                    applications will be accepted.
                </p>
                <p className="info">
                    We are not opening Senior Mentor positions at this time. We
                    look forward to reading your application!
                </p>
            </span>
        ),
    },
    APPLICATIONS_CLOSED: {
        LABEL:
            "Applications have closed for this semester; check back at the end of the semester!",
    },
};

export const FAQ = {
    LABEL: "FAQ",
    JM_QUALITIES: {
        Q: "What are you looking for in a Junior Mentor?",
        A:
            "We look for applicants who are dedicated to their students. This could be in the form " +
            "of previous tutoring experience, mastery of the material, and flexible time " +
            "commitments. While we do take grades into account, it is not a prioritized metric. " +
            "Many successful mentors have received a variety of grades.",
    },
    JM_PREREQS: {
        Q: "Are there any prerequisites to be a Junior Mentor?",
        A:
            "There are no formal requirements, but we prefer mentors who have had at least one " +
            "semester of academic interning, either in past semesters or concurrently.",
    },
    JM_COMMITMENT: {
        Q: "What is the time commitment for a Junior Mentor?",
        A:
            "We estimate 3-4 hours/week, between a family meeting with Senior Mentors and other " +
            "Junior Mentors (1 hour), teaching section (1-1.5 hours), and other preparation (1-2 hours).",
    },
    /* // I went ahead and removed this since this no longer seems to be an option we advertise
    JM_WITHOUT_SM: {
        Q: "Can I be a junior mentor without meeting with a senior mentor?",
        A: 'You may. We have another category of mentor called "Associate Mentor" in which you ' +
            "have extensive experience in the class you’re mentoring for. We will be more strict " +
            "with acceptances as an Associate Mentor and generally encourage first time tutors to " +
            "be a Junior Mentor and receive guidance from Senior Mentors."
    }
    */
    JM_UNITS: {
        Q: "Can I get units for being a mentor?",
        A:
            "Yes! Each Junior Mentor can receive 1 unit of P/NP credit. We will provide you the " +
            "appropriate CCN when the time comes. You are not required to enroll.",
    },
    OTHER_TUTORING: {
        Q: "Can I also do other forms of tutoring other than group?",
        A:
            "Junior Mentors’ primary responsibility is to host group tutoring. However, Junior " +
            "Mentors may also choose to do 1-1 tutoring in conjunction with CS 370, Introduction " +
            "to Teaching Computer Science. For other forms of support, you are free to lab assist " +
            "or assist in office hours or guerrilla sections, provided you have received a passing " +
            "grade in your respective class.",
    },
    CS_370: {
        Q: "What is CS 370?",
        A:
            "CS 370, or CS 98, Introduction to Teaching Computer Science, is a class for aspiring " +
            "teachers, providing guidance to lab assistants on how to teach computer science and " +
            "put it into practice. Students in the class gain experience through 1-1 tutoring for " +
            "a class of their choice. Many of our mentors have taken this class concurrently or " +
            "previously, and it is highly recommended!",
    },
    CONTACT: FAQ_CONTACT,
};
