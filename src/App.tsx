import React from "react";
// Using HashRouter instead of BrowserRouter for backwards compatibility in URLs
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Bios, Team, Partners, Mentors, Students, Home } from "./pages";
import { Header, Footer } from "./components";

import urls from "./data/urls.json";

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
                    <ExternalRedirect path="/apply" target={ urls.applicationForm } />
                    <ExternalRedirect path="/scheduler" target={ urls.scheduler } />
                    <ExternalRedirect path="/facebook" target={ urls.facebook } />
                    <ExternalRedirect path="/sage" target={ urls.sage } />
                    {/* TODO add mail url? */}
                    {/* TODO replace this with a proper 404, or redirect home */}
                    <Route render={() => <div>Not found</div>} />
                </Switch>
            <Footer />
        </Router>
    );
}

export default App;
