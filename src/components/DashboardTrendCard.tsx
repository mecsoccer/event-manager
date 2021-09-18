import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCreatedEvent } from '../utils/events';

interface Props {
  name: string,
  startDate: Date,
  endDate: Date,
  reload: boolean,
  setReload: React.Dispatch<React.SetStateAction<boolean>>, 
}

const DashboardTrendCard: React.FC<Props> = ({ name, startDate, reload, setReload }) => {
  return (
    <div className="bg-red-600 dhp-bottom-flex-item" >
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
