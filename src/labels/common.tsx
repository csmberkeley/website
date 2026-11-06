import React from "react";

import courseIds from "../data/courses.json";
import extendedCourseIds from "../data/extended_courses.json";

import { formatCourseName } from "./courseNames";

const courses = courseIds.map(formatCourseName);
const extendedCourses = extendedCourseIds.map(formatCourseName);

export const COURSE_STRING_WITH_AND = courses.length === 1 ? courses[0] : courses
    .slice(0, courses.length - 1)
    .concat([`and ${courses.slice(-1)[0]}`])
    .join(", ");

export const EXTENDED_COURSES_STRING_WITH_AND = extendedCourses.length === 1 ? extendedCourses[0] : extendedCourses
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
