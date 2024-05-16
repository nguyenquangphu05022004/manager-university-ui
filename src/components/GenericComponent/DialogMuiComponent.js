
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button style={{width:'100%', backgroundColor:'#0dcaf0', color:'black'}} onClick={handleOpen}>{props.nameAction}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={"modal-modal-title" + props.number}
        aria-describedby={"modal-modal-description" + props.number}
      >
        <Box sx={style}>
          <Typography id={"modal-modal-title" + props.number} variant="h6" component="h2">
            {props.nameSomething}
          </Typography>
          <Typography id={"modal-modal-description" + props.number} sx={{ mt: 2 }}>
            {props.interface}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}