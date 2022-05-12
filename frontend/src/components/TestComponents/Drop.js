import React, { useState, useRef } from "react";
import "./index.css";
import BellIcon from "./icons/bell.svg";
import ArrowIcon from "./icons/arrow.svg";
import BoltIcon from "./icons/bolt.svg";
import CaretIcon from "./icons/caret.svg";
import ChevronIcon from "./icons/chevron.svg";
import CogIcon from "./icons/cog.svg";
import MessengerIcon from "./icons/messenger.svg";
import PlusIcon from "./icons/plus.svg";
function Drop(props) {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

// const DropdownMenu = React.forwardRef((props, ref) => {
//   const DropdownItem = (props) => {
//     return (
//       <a href="#" className="menu-item">
//         <span className="icon-button">{props.leftIcon}</span>
//         <span>{props.children}</span>
//         <span className="icon-button icon-right">{props.rightIcon}</span>
//       </a>
//     );
//   };
//
//   return (
//     <div ref={ref} className="dropdown">
//       <DropdownItem>My Profile</DropdownItem>
//       <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronIcon />}>
//         Settings
//       </DropdownItem>
//     </div>
//   );
// });

const DropdownMenu = (props) => {
  const DropdownItem = (props) => {
    return (
      <a href="#" className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        <span>{props.children}</span>
        <span className="icon-button icon-right">{props.rightIcon}</span>
      </a>
    );
  };

  return (
    <div className="dropdown">
      <DropdownItem>My Profile</DropdownItem>
      <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronIcon />}>
        Settings
      </DropdownItem>
    </div>
  );
};

const Navbar = (props) => {
  return (
    <nav className={"navbar"}>
      <ul className={"navbar-nav"}>{props.children}</ul>
    </nav>
  );
};

const NavItem = (props) => {
  // const [open, setOpen] = useState(false);
  const ref = useRef();
  return (
    <li className="nav-item">
      <a
        href="#"
        className={"icon-button"}
        onClick={() => {
          // setOpen(!open);
          ref.current.classList.toggle("active");
        }}
      >
        {props.icon}
      </a>
      <div className={"dropdown-head-div"} ref={ref}>
        {props.children}
        {/*{open && props.children}*/}
      </div>
    </li>
  );
};

export default Drop;
