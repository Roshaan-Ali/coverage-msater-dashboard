import React from "react";
// import { SketchPicker } from "react-color";
import { ChromePicker } from "react-color";

/**
 * displayColorPicker --- (state boolean on which popup open/close - Required)
 * setDisplayColorPicker --- (state function for popup open/close - Required)
 * color --- (get selected color value -  Required)
 * setColor --- (set selected color value -  Required)
 * pickClrRef --- (Color reference - Required)
 * isShowTransparentBtn --- (Show/Hide Transparent Btn - Optional)
 */

const ColorPicker = ({
  displayColorPicker,
  setDisplayColorPicker,
  color,
  setColor,
  pickClrRef,
  isShowTransparentBtn = false,
}) => {
  const handlePickClick = () => {
    setDisplayColorPicker((prev) => !prev);
  };

  const handleColorChange = (color) => {
    const clrData = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    // setColor(color.hex);
    setColor(clrData);
  };

  return (
    <>
      <div className="color-picker">
        <button
          ref={pickClrRef}
          className="color-picker__button"
          //   style={{ visibility: "hidden" }}
          style={{ display: "none" }}
          onClick={handlePickClick}
          //   onClick={() => console.log("workingggggggggggg")}
        >
          Pick Color
        </button>
        {displayColorPicker && (
          <div className="color-picker__popover">
            {isShowTransparentBtn && (
              <button
                className="btn btn-sm btn-primary w-100"
                onClick={() => {
                  handleColorChange({ rgb: { r: 0, g: 0, b: 0, a: 0 } });
                }}
              >
                <small>Transparent</small>
              </button>
            )}
            <ChromePicker color={color} onChange={handleColorChange} />
          </div>
        )}
      </div>
    </>
  );
};

export default ColorPicker;
