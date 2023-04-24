function Square(props) {
    return (
      <button
        className="square"
        style={{
          fontSize: "40px",
          width: "80px",
          height: "80px",
          verticalAlign: "top",
          outline: "none"
        }}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }

  export default Square;