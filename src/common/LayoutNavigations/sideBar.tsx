import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { VerticalMenuItems } from "../RoutingMenuItems/verticalMenuItems";
import { HandleLogout } from "@/services/auth";
import { useRouter } from "next/router";
import styles from "../../styles/sidebar.module.css";

const SideBar = () => {
  const router = useRouter();
  const NavItem = VerticalMenuItems();

  const navigateURL = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Sidebar
        className={styles.asideTag}
        breakPoint="sm"
        transitionDuration={500}
        backgroundColor={"rgb(255, 255, 255)"}
      >
        <Menu>
          {NavItem.map((item: any, index: number) => {
            const pathnameMatch =
              router.pathname === item?.path || router.pathname.includes(item.path)
                ? styles.activeMenuItem
                : styles.nonActiveMenuItem;
            return (
              <>
                {item?.children ? (
                  <SubMenu
                    key={index}
                    icon={<item.icon />}
                    label={item.title}
                    defaultOpen={router.pathname.includes("all")}
                    className={pathnameMatch}
                  >
                    {item?.children.map((subItem: any, idx: number) => {
                      const subPathnameMatch =
                        router.pathname.includes(subItem.path)
                          ? styles.activeMenuItem
                          : styles.nonActiveMenuItem;

                      return (
                        <MenuItem
                          key={idx}
                          icon={<subItem.icon />}
                          onClick={() => navigateURL(subItem.path)}
                          active={router.pathname.includes(subItem.path)}
                          className={subPathnameMatch}
                        >
                          {subItem.title}
                        </MenuItem>
                      );
                    })}
                  </SubMenu>
                ) : item.title !== "Logout" ? (
                  <MenuItem
                    key={index}
                    icon={<item.icon />}
                    onClick={() => navigateURL(item.path)}
                    active={router.pathname === item.path}
                    className={pathnameMatch}
                  >
                    {item.title}
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={index}
                    icon={<item.icon />}
                    active={router.pathname === item.path}
                    onClick={() => {
                      HandleLogout();
                    }}
                    className={pathnameMatch}
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
