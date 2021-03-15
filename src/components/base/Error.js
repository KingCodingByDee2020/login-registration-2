import PropTypes from 'prop-types';

function Error({ error }) {
  return <p>{error.message} 💣</p>;
}

Error.propTypes = { error: PropTypes.objectOf(PropTypes.string).isRequired };

export default Error;
