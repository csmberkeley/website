// Sanity tests to ensure every page of the website loads without crashing.

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import COURSES from "./data/courses";
import App from "./App";
import { Team, Partners, Mentors, Students, Home } from "./pages";

// Bios aren't tested because I don't want to figure out how to test with a match prop
let pages = [Team, Partners, Mentors, Students, Home];

it("renders root without crashing", () => {
    const rootDiv = document.createElement("div");
    ReactDOM.render(<App />, rootDiv);
});

it("renders pages without crashing", () => {
    for (let Page of pages) {
        const rootDiv = document.createElement("div");
        ReactDOM.render(
            <Router basename="/">
                <Page />
            </Router>,
            rootDiv
        );
    }
});
