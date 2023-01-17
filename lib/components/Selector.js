import React from "react";
import * as Select from "@radix-ui/react-select";
import { styled } from "../../stitches.config";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";

export const Selector = (props) => (
  <Select.Root
    value={props.value}
    onValueChange={props.onValueChange}
  >
    <SelectTrigger aria-label="Course">
      <Select.Value
        placeholder="Select a datapack"
        value={props.value}
      />
      <SelectIcon>
        <BiChevronDown />
      </SelectIcon>
    </SelectTrigger>
    <Select.Portal>
      <SelectContent>
        <SelectScrollUpButton>
          <BiChevronUp />
        </SelectScrollUpButton>
        <SelectViewport>
          {props.children}
        </SelectViewport>
        <SelectScrollDownButton>
          <BiChevronDown />
        </SelectScrollDownButton>
      </SelectContent>
    </Select.Portal>
  </Select.Root>
);

const SelectTrigger = styled(Select.SelectTrigger, {
  all: "unset",
  outline:"none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$1",
  padding: "0 15px",
  fontSize: 13,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: "white",
  color: "$gray11",
  boxShadow: "$shadow1",
  border:"1px solid $gray5",
  "&:hover": { backgroundColor: "$gray3" },
  "&[data-placeholder]": { color: "$gray11" },
});

const SelectIcon = styled(Select.SelectIcon, {
  color: "$gray11",
});

const SelectContent = styled(Select.Content, {
  overflow: "hidden",
  backgroundColor: "$gray1",
  border:"1px solid $gray5",
  borderRadius: "$2",
  zIndex:"10",
  boxShadow:"$3",
});

const SelectViewport = styled(Select.Viewport, {
  padding: 5,
});

const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <StyledItem {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <BiCheck/>
      </StyledItemIndicator>
    </StyledItem>
  );
});

const StyledItem = styled(Select.Item, {
  fontSize: 13,
  lineHeight: 1,
  color: "$gray12",
  borderRadius: "$1",
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 35px 0 25px",
  position: "relative",
  userSelect: "none",

  "&[data-disabled]": {
    color: "$gray8",
    cursor: "not-allowed",
  },

  "&[data-highlighted]": {
    outline: "none",
    backgroundColor: "black",
    color: "$gray1",
  },
});

const SelectLabel = styled(Select.Label, {
  padding: "0 25px",
  fontSize: 12,
  lineHeight: "25px",
  color: "$gray10",
});

const SelectSeparator = styled(Select.Separator, {
  height: 1,
  backgroundColor: "$gray6",
  margin: 5,
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const scrollButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
  backgroundColor: "white",
  color: "$red11",
  cursor: "default",
};

const SelectScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);

const SelectScrollDownButton = styled(Select.ScrollDownButton, scrollButtonStyles);

Selector.Item = SelectItem;
Selector.Hr = SelectSeparator;
Selector.Group = Select.Group;
Selector.Label = SelectLabel;
export default Selector;