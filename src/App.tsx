import React from "react";

import { Home, Header, Footer } from "./pages";

// Using HashRouter instead of BrowserRouter for backwards compatibility in URLs
import { HashRouter as Router, Route, Link } from "react-router-dom";

function App() {
    // <Route exact path="" component=""/>
    return (
        <Router basename="/">
            <Header />
                <Route path="/" component={ Home } />
            <Footer />

            {/* External redirects: https://stackoverflow.com/a/44563899 */}
            <Route path="/scheduler" component={() => {
                window.location.href = "https://scheduler.csmentors.org";
                return null;
            }} />
            <Route path="/facebook" component={() => {
                window.location.href = "https://www.facebook.com/BerkeleyCSM/";
                return null;
            }} />
        </Router>
    );
}

export default App;
