import { RefObject } from "react";

const UseDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>,
) => {
  const getDropDownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropDownWidth = 240; // width of the dropdown

    // calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    //check if dropdown would go off the righ edge of the viewport
    if (left + dropDownWidth > window.innerWidth) {
      //align to right edge of button instead
      left = rect.right + window.scrollX - dropDownWidth;

      // if still offscreen, align to the edge of viewport with some padding
      if (left < 0) {
        left = window.innerWidth - dropDownWidth - 16;
      }
    }

    //ensure dropdown doesnt go off the left edge
    if (left < 0) {
      left = 16;
    }
    return { top, left };
  };

  return { getDropDownPosition };
};
export default UseDropdownPosition;
