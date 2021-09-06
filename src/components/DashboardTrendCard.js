import React from 'react';
//import { ReactComponent as TrendUp } from "../assets/images/trending-up.svg";
//import { ReactComponent as TrendDown } from "../assets/images/trending-down.svg";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCreatedEvent } from '../utils/events';

const DashboardTrendCard = ({ name, startDate, reload, setReload }) => {
  return (
    <div className={`dhp-bottom-flex-item`} >
      <p>{name}</p>
      <div className="dhp-trend-circle-div">
        <p>{(new Date(startDate)).toLocaleDateString()}</p>
      </div>
      <div className="dhp-charts-div-bottom">
        <h3>{(new Date(startDate)).toLocaleTimeString()}</h3>
        <div className="dhp-charts">
          <EditIcon style={{color:'blue',cursor: 'pointer'}} />
          <DeleteIcon
            style={{color:'darkred', cursor: 'pointer'}}
            onClick={() => deleteCreatedEvent(name, () => setReload(!reload))}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTrendCard;
