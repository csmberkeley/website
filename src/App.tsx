import React from "react";
// Using HashRouter instead of BrowserRouter for backwards compatibility in URLs
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Bios, Team, Partners, Mentors, Students, Home } from "./pages";
import { Header, Footer, ScrollToTop } from "./components";

import urls from "./data/urls.json";
import courses from "./data/courses.json";

class ExternalRedirect extends React.Component <{ path: string; target: string }> {
    render() {
        // https://stackoverflow.com/a/44563899
        return (
            <Route path={ this.props.path } component={() => {
                window.location.href = this.props.target;
                return (
                    <p>
                        Redirecting you to {" "}
                        <a href={this.props.target}>{this.props.target}</a>
                    </p>
                );
            }} />
        );
    }
}

function App() {
    return (
        <Router basename="/">
            <ScrollToTop>
                <Header />
                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route exact path="/students" component={ Students } />
                        <Route exact path="/mentors" component={ Mentors } />
                        <Route exact path="/partners" component={ Partners } />
                        <Route exact path="/team" component={ Team } />
                        <Route exact path="/bios" component={ Bios } />
                        <Route exact path="/bios/:course" component={ Bios } />
                        <Redirect exact from="/exec" to="/bios/exec" />
                        {
                            courses.map(name =>
                                <Redirect exact from={ "/" + name.toLowerCase() } to={ "/bios/" + name.toLowerCase() } key={name}/>
                            )
                        }
                        <ExternalRedirect path="/apply" target={ urls.applicationForm } />
                        <ExternalRedirect path="/interest" target={ urls.interestForm } />
                        <ExternalRedirect path="/scheduler" target={ urls.scheduler } />
                        <ExternalRedirect path="/facebook" target={ urls.facebook } />
                        <ExternalRedirect path="/github" target={ urls.github } />
                        {/* TODO add mail url? */}
                        {/* TODO replace this with a proper 404, or redirect home */}
                        <Route render={() => <div>Not found</div>} />
                    </Switch>
                <Footer />
            </ScrollToTop>
        </Router>
    );
}

export default App;
