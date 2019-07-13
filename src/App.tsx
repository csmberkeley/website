import React from "react";

import { Home, Header, Footer } from "./pages";

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
