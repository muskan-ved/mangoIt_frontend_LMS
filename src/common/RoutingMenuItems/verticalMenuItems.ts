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
    title: 'User',
    icon: PeopleAltOutlinedIcon,
    path: '/profile'
  },
  {
    title: 'Invoices',
    icon: InsertDriveFileOutlinedIcon,
    path: '/invoices'
  },
  {
    title: 'Configuration',
    icon: QueryStatsOutlinedIcon,
    path: '/configuration'
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
