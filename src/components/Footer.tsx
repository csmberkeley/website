import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.scss";

export default class Footer extends React.Component {
    render() {
        // TODO consider adding resources subheader? and resize container
        return (
            <footer className="page-footer">
                <div className="container">
                    <div className="row">
                        <div className="col l2 m3 s12">
                            <h5 className="white-text">Contact</h5>
                            <ul>
                                <li>
                                    <a
                                        className="grey-text text-lighten-3"
                                        href="mailto:mentors@berkeley.edu"
                                    >
                                        Contact us
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col l2 m3 s12">
                            <h5 className="white-text">Join</h5>
                            <ul>
                                <li>
                                    <Link
                                        to="/students"
                                        className="grey-text text-lighten-3"
                                    >
                                        Students
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/mentors"
                                        className="grey-text text-lighten-3"
                                    >
                                        Mentors
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/partners"
                                        className="grey-text text-lighten-3"
                                    >
                                        Partners
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col l2 m3 s12">
                            <h5 className="white-text">Team</h5>
                            <ul>
                                <li>
                                    <Link
                                        to="/team"
                                        className="grey-text text-lighten-3"
                                    >
                                        Current Team
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col l3 m3 s12">
                            <h5 className="white-text">Misc.</h5>
                            <ul>
                                <li>
                                    <Link
                                        to="/scheduler"
                                        className="grey-text text-lighten-3"
                                    >
                                        Scheduler
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        <div className="ocf">
                            <p className="pledge">
                                We are a student group acting independently of
                                the University of California. We take full
                                responsibility for our organization and this web
                                site.
                            </p>
                            <a href="https://www.ocf.berkeley.edu">
                                <img
                                    src="https://www.ocf.berkeley.edu/hosting-logos/ocf-hosted-penguin.svg"
                                    alt="Hosted by the OCF"
                                    style={{ border: 0 }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
