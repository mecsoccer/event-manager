import React from "react";
import { Button, makeStyles } from '@material-ui/core';
import { handleFileInput } from "../utils/validations";

const FileUpload = (
  { field, title, formValues, setFormValues, bottomClearance, helperText, maxSize }
) => {
  const classes = useStyles();

  return (
    <div style={{ marginBottom: bottomClearance }}>
      <p style={{ marginBottom: 5 }}>{title}</p>
      <div className={formValues[field].validation !== true ? 'custom-file-field-error' : ''}
        style={{display:'flex',alignItems:'center',maxWidth:400,padding:5,borderRadius:4,border:'1px dashed #00000026'}}
      >
        <div className={classes.root}>
          <input
            className={classes.input}
            id={field}
            type="file"
            onChange={(e) => {
              handleFileInput(
                field,
                e.target.files[0],
                /.+\.(pdf|docx)$/gi,
                maxSize || 5000000,
                formValues,
                setFormValues
              );
            }}
          />
          <label htmlFor={field}>
            <Button
              className={classes.btnUpload}
              variant="contained"
              color="primary"
              component="span"
            >
              Upload
            </Button>
          </label>
        </div>
        <span>{formValues[field].value !== '' ? formValues[field].value.name : 'No file chosen'}</span>
      </div>
      <span style={{fontSize:12,opacity:0.6,marginLeft:15}}>{helperText}</span>
      <span style={{color:'#e53935'}}>{formValues[field].validation !== true ? formValues[field].validation : ''}</span>
    </div>
  );
};

export default FileUpload;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  input: {
    display: 'none',
  },
  btnContained: {
    height: 56,
    backgroundColor: 'black',
    color: 'white',
    fontSize: 14,
    letterSpacing: 1.4,
    marginBottom: 20,
    maxWidth: 190,
  },
  btnOutlined: {
    height: 56,
    backgroundColor: 'transparent',
    border: '1px solid black',
    color: 'black',
    fontSize: 14,
    letterSpacing: 1.4,
    marginBottom: 20,
    maxWidth: 190,
  },
  btnUpload: {
    height: 44,
    backgroundColor: 'black',
    color: 'white',
    fontSize: 14,
    letterSpacing: 1.4,
    maxWidth: 190,
  }
}));
