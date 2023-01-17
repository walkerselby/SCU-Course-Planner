import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import Button from "../button/Button";
import { styled } from "../../stitches.config";
import { BiX } from "react-icons/bi";
import AlignItems from "../alignment/AlignItems";
import { keyframes } from "@stitches/react";

const slideIn = keyframes({
  "0%": {
    opacity: 0,
		transform: "translateY(0px) translateX(-50%) scale(0.5)",
    borderRadius:"100px"
  },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  opacity:"0.6",
  cursor: "pointer",
  position: "fixed",
  inset: 0,
  zIndex:1,
  background: "$gray2",
  cursor: "pointer",
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${slideIn} 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$gray1",
  border: "1px solid $gray5",
  borderRadius: "$3",
  boxShadow: "$3",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "600px",
  padding: "$3",
  overflowY:"scroll",
  overflowX:"hidden",
  zIndex:2,
  "&:focus": { outline: "none" },
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${slideIn} 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

function Content({children, ...props}) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>
        {children}
      </StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  color: "$gray12",
  margin: 0,
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  color: "$gray12",
  fontSize: 15,
  lineHeight: 1.5,
});

export default function Dialog(props){
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        {props.trigger}
      </DialogPrimitive.Trigger>
      <Content>
        <AlignItems
          justifyContent={"space-between"}
          margin={"0 0 $1 0"}
        >
          {props.title ?
            <StyledTitle>{props.title}</StyledTitle>:
            <>{props.topLeftComponent}</>
          }
          {props.topRightComponent ? props.topRightComponent:
            <DialogPrimitive.Close asChild>
              <Button
                size={"icon"}
                aria-label="Close"
                icon={<BiX/>}
              >
                Close
              </Button>
            </DialogPrimitive.Close>
          }
        </AlignItems>
        {props.description &&
          <StyledDescription>
            {props.description}
          </StyledDescription>
        }
        {props.children}
      </Content>
    </DialogPrimitive.Root>
  )
};