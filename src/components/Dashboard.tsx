import React, { useEffect, useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useHistory } from "react-router-dom";
import tbhLogo from "../assets/images/TBH-logo.png";
//import { ReactComponent as PieChartIcon } from "../assets/images/components/dashboard/pie-chart.svg";
import { ReactComponent as UserIcon } from "../assets/images/components/dashboard/user.svg";
//import { ReactComponent as UsersIcon } from "../assets/images/components/dashboard/users.svg";
import { ReactComponent as CreditCardIcon } from "../assets/images/components/dashboard/credit-card.svg";
import { ReactComponent as CalendarIcon } from "../assets/images/components/dashboard/calendar.svg";
import { checkLoggedIn, getUserProfile, logout } from "../utils/auth";
import { Button } from "@material-ui/core";
import { ROUTES } from "../constants/routes";

const Dashboard: React.FC = (props) => {
  const history = useHistory();
  const [barOpen, setBarOpen] = useState(false);
  const [mainLink, setMainLink] = useState(1);

  useEffect(() => checkLoggedIn(history), [history])

  useEffect(() => {
    if (window.screen.availWidth < 900) setBarOpen(true);
  }, []);

  const sideBarLinks = [
    { id: 1, icon: <CalendarIcon />, title: 'Events', href: '' },
    { id: 2, icon: <UserIcon />, title: 'Past Events', href: '' },
    { id: 3, icon: <CreditCardIcon />, title: 'Current Events', href: '' },
    //{ id: 4, icon: <PieChartIcon />, title: 'Scheduled Shipments', href: '' },
    //{ id: 5, icon: <UsersIcon />, title: 'User Management', href: '' },
  ];

  const user = getUserProfile();
  if (!user) {
    window.location.assign(ROUTES.login);
    return null;
  }

  const { firstName, lastName, email } = getUserProfile();

  const events = JSON.parse(localStorage.getItem('events') || '') || {};
  const userEvents = events[email] || [];

  return (
    <div className="sdf-general-dashboard">
      <div
        onClick={() => setBarOpen(false)}
        className={barOpen ? "sdf-gd-sidebar sidebar-open" : "sdf-gd-sidebar sidebar-closed"}
      >
        <div className="sdf-gd-sb-inner" onClick={(e) => e.stopPropagation()}>
          <div className="sdf-gd-sbi-logo-div">
            <img src={tbhLogo} alt="the business hub" style={{width:80}} />
          </div>
          <div className="sdf-gd-sbi-user-div">
            <Avatar  />
            <div className="sdf-gd-sbi-user-details">
              <h3>{firstName} {lastName}</h3>
              <p>user</p>
            </div>
          </div>
          <div className="sdf-gd-sbi-nav-links">
            {sideBarLinks.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={
                    item.id === mainLink ? "sbi-nav-main-link sbi-nav-link" : "sbi-nav-link"
                  }
                  onClick={() => setMainLink(item.id)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="sdf-gd-content-container">
        <nav>
          <span className="sdf-nav-menu">
            <MenuIcon onClick={() => setBarOpen(true)} />
          </span>
          <div>
            <Badge badgeContent={userEvents.length} max={9} color="secondary">
              <NotificationsNoneIcon />
            </Badge>
            <Button
              style={{marginLeft:20}}
              onClick={logout}
            >sign out</Button>
          </div>
        </nav>
        {props.children}
      </div>
    </div>
  )
};

export default Dashboard;
