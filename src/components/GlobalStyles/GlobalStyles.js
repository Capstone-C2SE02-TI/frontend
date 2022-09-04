import PropTypes from 'prop-types';
import './GlobalStyles.scss';

export default function GlobalStyle({ children }) {
    return children;
}
GlobalStyle.propTypes = {
    children: PropTypes.node,
};
