import React from "react";

export const COVER_SUBTITLE =
    "Computer Science Mentors for introductory electrical " +
    "engineering and computer science courses at UC Berkeley";

export const STAT_DESCRIPTIONS = {
    STUDENT_COUNT: "Students Serviced",
    MENTOR_COUNT: "Mentors",
    AVG_MENTOR_RATING: "Average mentor rating:",
    RETURN_PCT: "would come back to a CSM session",
};

export const WHAT_IS_CSM = {
    LABEL: "What is CSM?",
    BODY:
        "CSM is a student-run organization that provides guidance and resources in a smaller " +
        "classroom environment through group tutoring sessions. Each section has 4-6 students and " +
        "focuses on material from one of the courses listed above. Outside of teaching, our " +
        "mentors watch movies, climb up to Soda almost everyday, hike, study together, and more!",
};

export const WHO_WE_ARE = {
    LABEL: "Who we are",
    // JSX is needed for bold formatting
    BODY_JSX: (
        <p className="info">
            We are a group of UC Berkeley students passionate about teaching and
            helping students succeed in computer science. CSM provides a tiered
            system of mentoring opportunities.
            <b>Senior Mentors</b> write material and provide tips to{" "}
            <b>Junior Mentors</b> on how to teach. All mentors meet up once a
            week to learn from each other, and use another time of the week to
            teach a section. Our <b>Associate Mentors</b> are either tutors,
            readers, or other experienced teachers who teach a section without a
            Senior Mentor.
        </p>
    ),
};

export const QUICK_LINKS = {
    JOIN_SECTION: {
        LABEL: "Plan to join a section?",
        BUTTON: "Join",
    },
    BECOME_MENTOR: {
        LABEL: "Want to be a mentor?",
        BUTTON: "Apply",
    },
    BECOME_PARTNER: {
        LABEL: "Want to work with us?",
        BUTTON: "Partner",
    },
};

export const PARTNER_SUBHEADING = "Our Partners";
export const LIKE_US_ON_FB =
    "Give our Facebook page a like for updates and events!";
