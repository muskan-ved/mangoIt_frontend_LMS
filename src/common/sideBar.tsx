import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { VerticalMenuItems } from "./verticalMenuItems";
import Link from "next/link";
import { HandleLogout } from "@/services/auth";
import { useRouter } from "next/router";

const SideBar = () => {
  const { collapseSidebar, toggleSidebar, toggled } = useProSidebar();
  const router = useRouter();

  const toggle = () => {
    toggleSidebar();
    if (toggled) {
      console.log(true);
      collapseSidebar();
    } else {
      console.log(false);
      collapseSidebar();
    }
  };

  const style = {
    borderTopRightRadius: "23px !important",
    borderBottomRightRadius: "23px !important",
    marginRight: "33px !important",
    color: "white !important",
    backgroundColor: "black !important",
  };

  const istyle = {
    borderTopRightRadius: "23px !important",
    borderBottomRightRadius: "23px !important",
    marginRight: "33px !important",
    // color:'white !important',
    // backgroundColor:'black !important',
  };

  const NavItem = VerticalMenuItems();

  return (
    <>
      <Sidebar
        style={{ height: "100vh" }}
        breakPoint="sm"
        transitionDuration={800}
      >
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>
          {NavItem.map((item: any, index: number) => {
            const pathnameMatch =
              router.pathname === item?.path ? style : istyle;
            return (
              <>
                {item?.children ? (
                  <SubMenu
                    key={index}
                    icon={<item.icon />}
                    open={true}
                    label={item.title}
                  >
                    {item?.children.map((subItem: any, idx: number) => {
                      const subPathnameMatch =
                        router.pathname === subItem.path ? style : istyle;
                    
                      return (
                        <MenuItem
                          key={idx}
                          icon={<subItem.icon />}
                          href={subItem.path}
                          style={
                            router.pathname === subItem.path ? style : istyle
                          }
                        >
                          {subItem.title}
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                ) : item.title !== "Logout" ? (
                  <MenuItem
                    key={index + 1}
                    icon={<item.icon />}
                    href={item.path}
                    style={pathnameMatch}
                  >
                    {item.title}
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={index + 2}
                    icon={<item.icon />}
                    onClick={() => {
                      HandleLogout();
                    }}
                    style={pathnameMatch}
                  >
                    {item.title}
                  </MenuItem>
                )}
              </>
            );
          })}
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;
