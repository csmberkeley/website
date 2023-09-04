import React from "react";

import courses from "../data/courses.json";
import extendedCourses from "../data/extended_courses.json";

// Mutating courses here mutates all references to it, which is why we need to do some voodoo
export const COURSE_STRING_WITH_AND = courses
    .slice(0, courses.length - 1)
    .concat([`and ${courses.slice(-1)[0]}`])
    .join(", ");

export const EXTENDED_COURSES_STRING_WITH_AND = extendedCourses
    .slice(0, extendedCourses.length - 1)
    .concat([`and ${extendedCourses.slice(-1)[0]}`])
    .join(", ");

export const FAQ_CONTACT = {
    Q: "Who can I contact if I have more questions?",
    A_JSX: (
        <p className="info">
            Feel free to email us at{" "}
            <a href="MAILTO:mentors@berkeley.edu">mentors@berkeley.edu</a> if
            you have any questions or concerns!
        </p>
    ),
};
