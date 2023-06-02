import PropTypes from 'prop-types';

const Button = ({onClick}) => (
    <button type="button" className="Button" onClick={onClick}>
        <span>Load more</span>
    </button>
)

Button.propTypes = {
    onClick: PropTypes.func,
};

export default Button