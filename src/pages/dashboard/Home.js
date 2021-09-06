import React, { useEffect, useState } from "react";
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ROUTES } from "../../constants/routes";
import DashboardTrendCard from "../../components/DashboardTrendCard";
import { getUserProfile } from "../../utils/auth";
import { getUserEvents } from "../../utils/events";

const Home = () => {
  const { firstName } = getUserProfile();

  const [reload, setReload] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(getUserEvents());
  }, [reload]);

  return (
    <div className="dashboard-home-page">
      <p className="dhp-title-p">Dashboard</p>
      <div className="dhp-welcome-banner">
        <h3>Welcome {firstName}</h3>
        <p>Click the button below to create an event</p>
        <ColorButton
          variant="contained"
          color="primary"
          fullWidth
          href={ROUTES.index}
        >
          create event
        </ColorButton>
      </div>
      <div className="dhp-bottom-flex-div">
        {events.map((item) => {
          return (
            <DashboardTrendCard
              name={item.name}
              startDate={item.startDate}
              endDate={item.endDate}
              reload={reload}
              setReload={setReload}
            />
          )
        })}
      </div>
    </div>
  )
};

export default Home;

const ColorButton = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: '#0c946e',
    },
    backgroundColor: '#ffffff',
    height: 45,
    color: '#6DC5DB',
    fontSize: 14,
    letterSpacing: 1.4,
    maxWidth: 200
  },
}))(Button);
