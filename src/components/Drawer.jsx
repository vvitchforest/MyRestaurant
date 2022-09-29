import { useRef, useEffect } from "react";
import cn from "classnames";
import { DoDisturbOffRounded } from "@mui/icons-material";
import { createPortal } from "react-dom";
import FocusTrap from "focus-trap-react";
import useMountTransition from "../utils/useMountTransition";

function createPortalRoot() {
  const drawerRoot = document.createElement("div");
  drawerRoot.setAttribute("id", "drawer-root");
  return drawerRoot;
}

/**
 * This code is from this tutorial: https://letsbuildui.dev/articles/building-a-drawer-component-with-react-portals
 *
 * Drawer is the component that is displayed on the bottom of the screen in map view when user selects a restaurant
 * @author Oskar Wiiala
 * @param [isOpen] a boolean which determines whether or not the drawer is displayed
 * @param [children] the content of the drawer
 * @param [className] optional CSS class
 * @param [onClose] handles closing the drawer
 * @param [position] position for the drawer such as left, bottom, top, right
 */

const Drawer = ({
  isOpen,
  children,
  className,
  onClose,
  position = "bottom",
  removeWhenClosed = true,
}) => {
  const bodyRef = useRef(document.querySelector("body"));
  const portalRootRef = useRef(
    document.getElementById("drawer-root") || createPortalRoot()
  );
  const isTransitioning = useMountTransition(isOpen, 300);

  // Append portal root on mount
  useEffect(() => {
    bodyRef.current.appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = bodyRef.current;

    return () => {
      // Clean up the portal when drawer component unmounts
      portal.remove();
      // Ensure scroll overflow is removed
      bodyEl.style.overflow = "";
    };
  }, []);

  // Prevent page scrolling when the drawer is open
  useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen) {
        bodyRef.current.style.overflow = "hidden";
      } else {
        bodyRef.current.style.overflow = "";
      }
    };
    updatePageScroll();
  }, [isOpen]);

  // Allow Escape key to dismiss the drawer
  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keyup", onKeyPress);
    }

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  return createPortal(
    <FocusTrap active={isOpen}>
      <div
        aria-hidden={isOpen ? "false" : "true"}
        className={cn("drawer-container", {
          open: isOpen,
          in: isTransitioning,
          className,
        })}
      >
        <div className={cn("drawer", position)} role="dialog">
          {children}
        </div>
        <div className="backdrop" onClick={onClose} />
      </div>
    </FocusTrap>,
    portalRootRef.current
  );
};

export default Drawer;
