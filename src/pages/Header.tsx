import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

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
                    <Link to="/scheduler">Scheduler</Link>
                </li>
            </ul>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">
                            CSM
                        </Link>
                        <LinkList ulClasses="right hide-on-med-and-down" />
                    </div>
                </nav>
            </div>
        );

        // TODO replace this jquery stuff for mobile
        //
        // <a href="javascript: void(0)" data-activates="mobile-demo" className="button-collapse black-text">
        //     <i className="fa fa-bars"></i>
        // </a>
        // <LinkList ulClasses="side-nav" id="mobile-demo" />
        /*
        <script>
            $('.modal-trigger').leanModal();
            $('.button-collapse').sideNav();
            $('.side-nav a').click(function() {
                $('.button-collapse').sideNav('hide');
            });
        </script>
        */
    }
}

export default Header;
