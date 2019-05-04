import React from 'react';
import Typography from "@material-ui/core/Typography";

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <Typography variant="body1" key={i}>{fieldName} {formErrors[fieldName]}</Typography>
        )
      } else {
        return '';
      }
    })}
  </div>
