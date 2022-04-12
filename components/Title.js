const Title = ({ title, ...props }) => {
  return (
    <h2
      {...props}
      className={`display-5 my-3 fw-normal ${
        props.className ? props.className : ""
      }`}
    >
      {title}
    </h2>
  );
};

export default Title;
