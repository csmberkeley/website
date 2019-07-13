import React from "react";
// TODO move into "pages" folder?
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
// Using HashRouter instead of BrowserRouter for backwards compatibility in URLs
import { HashRouter as Router, Route, Link } from "react-router-dom";

function App() {
    // Scheduler redirect: https://stackoverflow.com/a/44563899
    // <Route exact path="" component=""/>
    return (
        <Router basename="/">
            <Header />
            <Footer />
            <Route path="/" component={ Home } />
            <Route path="/scheduler" component={() => {
                window.location.href = "https://scheduler.csmentors.org";
                return null;
            }} />
        </Router>
    );
}

export default App;
