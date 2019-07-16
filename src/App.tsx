import React from "react";

import { Bios, Team, Partners, Mentors, Students, Home } from "./pages";
import { Header, Footer } from "./components";

// Using HashRouter instead of BrowserRouter for backwards compatibility in URLs
import { HashRouter as Router, Route, Switch } from "react-router-dom";

class ExternalRedirect extends React.Component <{ path: string; target: string }> {
    render() {
        // https://stackoverflow.com/a/44563899
        return (
            <Route path={ this.props.path } component={() => {
                window.location.href = this.props.target;
                return null;
            }} />
        );
    }
}

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
                    <ExternalRedirect path="/scheduler" target="https://scheduler.csmentors.org" />
                    <ExternalRedirect path="/facebook" target="https://www.facebook.com/BerkeleyCSM/" />
                    <ExternalRedirect path="/sage" target="https://csmberkeley.github.io/sage/" />
                    {/* TODO replace this with a proper 404, or redirect home */}
                    <Route render={() => <div>Not found</div>} />
                </Switch>
            <Footer />
        </Router>
    );
}

export default App;
