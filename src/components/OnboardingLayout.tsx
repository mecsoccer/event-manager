import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import BkgImage from "../assets/images/components/onboarding/sdf-onboarding-img.png";
import tbhLogo from "../assets/images/TBH-logo.png";
import { ROUTES } from "../constants/routes";

interface Props {
  classStyle?: object
}

const OnboardingLayout: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="signup-general">
      <div className="signup-img-div">
        <div className="sid-logo" onClick={() => history.push(ROUTES.dashboardHome)}>
          <img src={tbhLogo} alt="sterling sdf logo" style={{width:80}} />
        </div>
        <img className="sid-bkg-img" alt="sdf loan" src={BkgImage} />
      </div>
      <div className="signup-container">
        <main className={`signup-form1-main ${classes.formWidth} ${props.classStyle}`}>
          {props.children}
        </main>
      </div>
    </div>
  );
}

export default OnboardingLayout;

const useStyles = makeStyles(theme => ({
  formWidth: {
    maxWidth: "400px"
  }
}));
