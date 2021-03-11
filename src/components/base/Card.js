import PropTypes from 'prop-types';

function Card({ children }) {
  return (
    <section className="border-2 border-black-600 p-4 rounded shadow-sm">
      {children}
    </section>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
