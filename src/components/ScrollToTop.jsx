import React from "react";
import { withRouter } from "react-router-dom";

// Scroll to top on visiting new page
// https://reacttraining.com/react-router/web/guides/scroll-restoration
class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
