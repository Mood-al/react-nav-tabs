import Title from "../Title";

const CustomNavBtns = ({
  isLeftArrowDisapled,
  isRightArrowDisapled,
  navBtnsRef,
}) => {
  return (
    <>
      <Title title="Control tabs" />{" "}
      <div className="row">
        <div className="col-md-6 d-flex">
          <button
            className="flex-fill btn rn___btn"
            disabled={isLeftArrowDisapled}
            onClick={() => navBtnsRef.current.onLeftBtnClick()}
          >
            click me to move the tabs to left
          </button>
        </div>
        <div className="col-md-6 d-flex">
          <button
            className="flex-fill btn rn___btn mt-md-0 mt-2"
            disabled={isRightArrowDisapled}
            onClick={() => navBtnsRef.current.onRightBtnClick()}
          >
            click me to move the tabs to right
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomNavBtns;
