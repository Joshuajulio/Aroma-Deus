import PropTypes from "prop-types";

export default function SubmitButton({ text, className }) {
  return (
    <button type="submit" className={className}>
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
