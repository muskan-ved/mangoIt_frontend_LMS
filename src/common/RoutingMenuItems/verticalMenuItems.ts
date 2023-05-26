import React, { useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";

export const VerticalMenuItems = () => {
  const [userData, setUserData] = React.useState<any>("");

  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      setUserData(JSON.parse(localData));
    }
  }, []);

  if (userData && userData?.role_id === 2) {
    return [
      {
        title: "Dashboard",
        icon: HomeOutlinedIcon,
        path: "/user/dashboard",
      },
      {
        title: "Profile",
        icon: ManageAccountsOutlinedIcon,
        path: "/user/profile",
      },
      {
        title: "Subscriptions",
        icon: SubscriptionsOutlinedIcon,
        path: "/user/subscription",
      },
      {
        title: "Courses",
        icon: DescriptionOutlinedIcon,
        path: "/user/course",
      },
      {
        title: "Logout",
        icon: PowerSettingsNewOutlinedIcon,
      },
    ];
  } else {
    return [
      {
        title: "Dashboard",
        icon: HomeOutlinedIcon,
        path: "admin/dashboard",
      },
      {
        title: "Courses",
        icon: DescriptionOutlinedIcon,
        children: [
          {
            title: "All Courses",
            icon: ContentPasteOutlinedIcon,
            path: "/admin/courses/allcourses",
          },
          {
            title: "All Modules",
            icon: ViewModuleOutlinedIcon,
            path: "/admin/courses/allmodules",
          },
          {
            title: "All Sessions",
            icon: CalendarTodayOutlinedIcon,
            path: "/admin/courses/allsessions",
          },
        ],
      },
      {
        title: "Profile",
        icon: ManageAccountsOutlinedIcon,
        path: "/profile",
      },
      {
        title: "Users",
        icon: PeopleAltOutlinedIcon,
        path: "/users",
      },
      {
        title: "Subscriptions",
        icon: SubscriptionsOutlinedIcon,
        path: "/subscriptions",
      },
      {
        title: "Configurations",
        icon: QueryStatsOutlinedIcon,
        children: [
          {
            title: "Email Config",
            icon: EmailOutlinedIcon,
            path: "/admin/configurations/emailconfiguration",
          },
          {
            title: "Site Config",
            icon: LanguageOutlinedIcon,
            path: "/admin/configurations/siteconfiguration",
          },
          {
            title: "Stripe Config",
            icon: PaymentOutlinedIcon,
            path: "/admin/configurations/stripeconfiguration",
          },
        ],
      },
      {
        title: "Invoices",
        icon: InsertDriveFileOutlinedIcon,
        path: "/admin/invoices",
      },
      {
        title: "Settings",
        icon: SettingsOutlinedIcon,
        path: "admin/settings",
      },
      {
        title: "Logout",
        icon: PowerSettingsNewOutlinedIcon,
      },
    ];
  }
  return [
    {
      title: "Dashboard",
      icon: HomeOutlinedIcon,
      path: "/dashboard",
    },
    {
      title: "Courses",
      icon: DescriptionOutlinedIcon,
      children: [
        {
          title: "All Courses",
          icon: ContentPasteOutlinedIcon,
          path: "/courses/allcourses",
        },
        {
          title: "All Modules",
          icon: ViewModuleOutlinedIcon,
          path: "/courses/allmodules",
        },
        {
          title: "All Sessions",
          icon: CalendarTodayOutlinedIcon,
          path: "/courses/allsessions",
        },
      ],
    },
    {
      title: "Profile",
      icon: ManageAccountsOutlinedIcon,
      path: "/profile",
    },
    {
      title: "Users",
      icon: PeopleAltOutlinedIcon,
      path: "/users",
    },
    {
      title: "Subscriptions",
      icon: SubscriptionsOutlinedIcon,
      path: "/subscriptions",
    },
    {
      title: "Configurations",
      icon: QueryStatsOutlinedIcon,
      children: [
        {
          title: "Email Config",
          icon: EmailOutlinedIcon,
          path: "/configurations/emailconfiguration",
        },
        {
          title: "Site Config",
          icon: LanguageOutlinedIcon,
          path: "/configurations/siteconfiguration",
        },
        {
          title: "Stripe Config",
          icon: PaymentOutlinedIcon,
          path: "/configurations/stripeconfiguration",
        },
      ],
    },
    {
      title: "Invoices",
      icon: InsertDriveFileOutlinedIcon,
      path: "/invoices",
    },
    {
      title: "Settings",
      icon: SettingsOutlinedIcon,
      path: "/settings",
    },
    {
      title: "Logout",
      icon: PowerSettingsNewOutlinedIcon,
    },
  ];
};
