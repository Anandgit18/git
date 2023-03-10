import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme)=>({
  root: {
      '& .MuiFormControl-root': {
          width: '80%',
          margin: theme.spacing(1)
      },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}
}));

 

