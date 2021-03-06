import React from "react";
import { NavLink as RouteNavLink } from "react-router-dom";
import {
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "shards-react";

type SubItem = {
  title: string;
  to: string;
};

type NavItem = {
  title: string;
  to: string;
  open: boolean;
  htmlBefore: string;
  htmlAfter: string;
  matches: string[];
  items?: SubItem[];
};

type Props = {
  item: NavItem;
  toggleSidebar: () => void;
};

export default ({ item, toggleSidebar }: Props) => {
  const hasSubItems = item.items && item.items.length;
  const path = window.location.hash.substring(2, window.location.hash.length);
  let active = false;
  item.matches.forEach((match) => {
    if (path.startsWith(match)) active = true;
  });

  return (
    <NavItem style={{ position: "relative" }}>
      <NavLink
        className={hasSubItems && "dropdown-toggle"}
        tag={hasSubItems ? "a" : RouteNavLink}
        to={hasSubItems ? "#" : item.to}
        active={active}
        onClick={toggleSidebar}
      >
        {item.htmlBefore && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
          />
        )}
        {item.title && <span>{item.title}</span>}
        {item.htmlAfter && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
          />
        )}
      </NavLink>
      {item.items && (
        <Collapse tag={DropdownMenu} small open={item.open} style={{ top: 0 }}>
          {item.items.map((subItem, idx) => (
            <DropdownItem key={idx} tag={RouteNavLink} to={subItem.to}>
              {subItem.title}
            </DropdownItem>
          ))}
        </Collapse>
      )}
    </NavItem>
  );
};
