import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import M from "materialize-css";

interface LinkProps {
    ulClasses: string; // css classes for ul tag
    id?: string;
}

// A list of links to be displayed in the navbar.
// Not to be confused with a LinkedList.
class LinkList extends React.Component<LinkProps> {
    render() {
        return (
            <ul className={this.props.ulClasses} id={this.props.id}>
                <li>
                    <Link to="/students">Students</Link>
                </li>
                <li>
                    <Link to="/mentors">Mentors</Link>
                </li>
                <li>
                    <Link to="/partners">Partners</Link>
                </li>
                <li>
                    <Link to="/team">Team</Link>
                </li>
                <li>
                    <Link to="/bios">Bios</Link>
                </li>
                <li>
                    <Link to="/sage">Teaching Tips</Link>
                </li>
                <li>
                    <Link to="/scheduler">Scheduler</Link>
                </li>
            </ul>
        );
    }
}

export default class Header extends React.Component {
    componentDidMount() {
        document.addEventListener("DOMContentLoaded", function() {
            var elems = document.querySelectorAll(".sidenav");
            M.Sidenav.init(elems, {});
        });
    }
    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">
                            CSM
                        </Link>
                        <a
                            href="#"
                            data-target="mobile-demo"
                            className="sidenav-trigger"
                        >
                            <i className="material-icons black-text">menu</i>
                        </a>
                        <LinkList ulClasses="right hide-on-med-and-down" />
                    </div>
                </nav>
                <LinkList ulClasses="sidenav" id="mobile-demo" />
            </div>
        );
    }
}
