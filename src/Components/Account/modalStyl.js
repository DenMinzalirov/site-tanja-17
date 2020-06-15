export const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  itemString: {
    backgroundColor: 'aliceblue',
    borderRadius: '50rem',
    margin: '10px',
  },
  buttonDel: {
    display: 'flex',
    flex: 'auto',
    justifyContent: 'center',
  },
  editer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  }
})
