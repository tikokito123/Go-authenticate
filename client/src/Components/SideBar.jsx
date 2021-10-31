import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

export default function SideBar() {
  return (
    <ProSidebar
      id="sidebar"
      toggled={true}
      breakPoint="xs"
      width="200px"
    >
      <SidebarHeader
        className="text-light font-weight-bold pt-3 pb-3 text-center"
        style={{ fontSize: "30px" }}
      >
        <a
          href="/"
          className=""
          style={{ color: "inherit", textDecoration: "none" }}
        >
          TikoWeb
        </a>
      </SidebarHeader>

        <Menu iconShape="square">
          <MenuItem icon="">Our Music</MenuItem>
          <MenuItem icon="">What can we do?</MenuItem>
          <MenuItem icon="">About Us</MenuItem>
          <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      <SidebarFooter>
        Here is the footer
      </SidebarFooter>
    </ProSidebar>
  );
}
