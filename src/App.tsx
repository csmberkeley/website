import React from "react";

import { Bios, Team, Partners, Mentors, Students, Home } from "./pages";
import { Header, Footer } from "./components";

// Using HashRouter instead of BrowserRouter for backwards compatibility in URLs
import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <Router basename="/">
            <Header />
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/students" component={ Students } />
                    <Route exact path="/mentors" component={ Mentors } />
                    <Route exact path="/partners" component={ Partners } />
                    <Route exact path="/team" component={ Team } />
                    <Route exact path="/bios" component={ Bios } />
                    {/* External redirects: https://stackoverflow.com/a/44563899 */}
                    <Route path="/scheduler" component={() => {
                        window.location.href = "https://scheduler.csmentors.org";
                        return null;
                    }} />
                    <Route path="/facebook" component={() => {
                        window.location.href = "https://www.facebook.com/BerkeleyCSM/";
                        return null;
                    }} />
                    {/* TODO replace this with a proper 404, or redirect home */}
                    <Route render={() => <div>Not found</div>} />
                </Switch>
            <Footer />
        </Router>
    );
}

export default App;
