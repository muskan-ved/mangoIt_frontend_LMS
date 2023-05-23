import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';

export const VerticalMenuItems = () => {
    return (
[
  {
    title: 'Dashboard',
    icon: HomeOutlinedIcon,
    path: '/dashboard'
  },
  {
    title: 'Courses',
    icon: DescriptionOutlinedIcon,
    children: [
        {
          title: 'All Courses',
          icon: ContentPasteOutlinedIcon,
          path: '/courses/allcourses'
        },
        {
          title: 'All Modules',
          icon: ViewModuleOutlinedIcon,
          path: '/courses/allmodules'
        },
        {
          title: 'All Sessions',
          icon: CalendarTodayOutlinedIcon,
          path: '/courses/allsessions'
        }
      ]
  },
  {
    title: 'Profile',
    icon: ManageAccountsOutlinedIcon,
    path: '/profile'
  },
  {
    title: 'Users',
    icon: PeopleAltOutlinedIcon,
    path: '/users'
  },
  {
    title: 'Subscriptions',
    icon: SubscriptionsOutlinedIcon,
    path: '/subscriptions'
  },
  {
    title: 'Configurations',
    icon: QueryStatsOutlinedIcon,
    children: [
        {
          title: 'Email Config',
          icon: EmailOutlinedIcon,
          path: '/configurations/emailconfiguration'
        },
        {
          title: 'Site Config',
          icon: LanguageOutlinedIcon,
          path: '/configurations/siteconfiguration'
        },
        {
          title: 'Stripe Config',
          icon: PaymentOutlinedIcon,
          path: '/configurations/stripeconfiguration'
        }
      ]
  },
  {
    title: 'Invoices',
    icon: InsertDriveFileOutlinedIcon,
    path: '/invoices'
  },
  {
    title: 'Settings',
    icon: SettingsOutlinedIcon,
    path: '/settings'
  },
  {
    title: 'Logout',
    icon: PowerSettingsNewOutlinedIcon,
  }

]
)}
