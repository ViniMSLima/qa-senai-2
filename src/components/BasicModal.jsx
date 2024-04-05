import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Draggable from 'react-draggable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  p: 4,
};

export const BasicModal = ({ index, item }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} style={{backgroundColor: 'white', borderRadius: '10px', width: '150px'}}>Info</Button>
      <Draggable>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h1 style={{ color: 'black' }}>{item.name}</h1>
                <h2 style={{ color: 'black' }}>{item.type}</h2>
                <h2 style={{ color: 'black' }}>{item.gender}</h2>
                <h2 style={{ color: 'black' }}>{item.species}</h2>
              </div>
              <div>
                <img style={{ height: '150px', width: '150px', objectFit: 'cover', borderRadius: '10px'}} src={item.image}></img>
              </div>
            </div>
          </Box>
        </Modal>
      </Draggable>
    </div>
  );
}
