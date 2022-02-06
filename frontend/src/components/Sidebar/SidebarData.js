import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { MdCategory } from "react-icons/md";
import { GiFactory } from "react-icons/gi";
import { GiMeat } from "react-icons/gi";
/* import { BiFoodMenu } from "react-icons/bi";
import { FaCashRegister } from "react-icons/fa"; */

export const navItems = [
  {
    text: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    text: "Meals",
    path: "/meals",
    icon: <ListAltIcon />,
  },
  {
    text: "Categories",
    path: "/categories",
    icon: <MdCategory />,
  },
  {
    text: "Ingredients",
    path: "/ingredients",
    icon: <GiMeat />,
  },
  {
    text: "Users",
    path: "/user-list",
    icon: <PeopleAltIcon />,
  },
  {
    text: "Suppliers ",
    path: "/suppliers",
    icon: <GiFactory />,
  },
  /*   {
    text: "Menu ",
    path: "/menu",
    icon: <BiFoodMenu />,
  },
  {
    text: "Cashier",
    path: "/cashier",
    icon: <FaCashRegister />,
  }, */
  {
    text: "Sales Report",
    path: "/sales-report",
    icon: <AssessmentIcon />,
  },
];
