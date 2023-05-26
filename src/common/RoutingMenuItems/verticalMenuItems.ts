import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

export const VerticalMenuItems = () => {
  return (
    [
      {
        title: 'Dashboard',
        icon: HomeOutlinedIcon,
        path: '/dashboard',
        disable:true
      },
      {
        title: 'Courses',
        icon: DescriptionOutlinedIcon,
        children: [
          {
            title: 'All Courses',
            icon: ContentPasteOutlinedIcon,
            path: '/courses/allcourses',
            disable:false
          },
          {
            title: 'All Modules',
            icon: ViewModuleOutlinedIcon,
            path: '/courses/allmodules',
            disable:false
          },
          {
            title: 'All Sessions',
            icon: CalendarTodayOutlinedIcon,
            path: '/courses/allsessions',
            disable:false
          }
        ]
      },
      {
        title: 'Users',
        icon: PeopleAltOutlinedIcon,
        path: '/users',
        disable:true
      },
      {
        title: 'Subscriptions',
        icon: SubscriptionsOutlinedIcon,
        path: '/subscriptions',
        disable:true
      },

      {
        title: 'Email Mngmt',
        icon: EmailOutlinedIcon,
        path: '/emailmanagement',
        disable:true
      },
      {
        title: 'Site Config',
        icon: LanguageOutlinedIcon,
        path: '/siteconfiguration',
        disable:false
      },
      {
        title: 'Invoices',
        icon: InsertDriveFileOutlinedIcon,
        path: '/invoices',
        disable:true
      },
      {
        title: 'Settings',
        icon: SettingsOutlinedIcon,
        path: '/settings',
        disable:true
      },
      {
        title: 'Logout',
        icon: PowerSettingsNewOutlinedIcon,
        disable:false
      }

    ]
  )
}
