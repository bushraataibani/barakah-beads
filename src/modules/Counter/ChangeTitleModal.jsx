import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: '#121212',
  borderRadius: 4,
  p: 3,
  color: '#FFD700',
};

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FFD700',
    },
    '&:hover fieldset': {
      borderColor: '#FFC300',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFD700',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#FFD700',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#FFD700',
  },
  input: {
    color: '#fff',
  },
};

const ChangeTitleModal = ({ showModal, setShowModal, setTasbih, setLapLimit, setCount, setRound, tasbih, lapLimit }) => {
  const [dikhr, setDikhr] = useState(tasbih ? tasbih : '')
  const [limit, setLimit] = useState(lapLimit ? lapLimit : '33');

  const handleSave = () => {
    setTasbih(dikhr);
    setLapLimit(limit);
    setCount(0);
    setRound(0);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Modal
      open={showModal}
      onClose={closeModal}
      // BackdropProps={{ style: { backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.7)' } }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style} tabIndex={-1} style={{ outline: 'none' }} >
        <Typography id="modal-title" variant="h6" fontWeight="bold" gutterBottom>
          Create Dikhr Title
        </Typography>

        <TextField
          fullWidth
          margin="dense"
          value={dikhr}
          onChange={(e) => setDikhr(e.target.value)}
          label="Dikhr Title"
          variant="outlined"
          sx={inputStyle}
        />
        <TextField
          fullWidth
          margin="dense"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          label="Dhikr Limit"
          variant="outlined"
          type="number"
          sx={inputStyle}
        />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button
            variant="outlined"
            onClick={closeModal}
            sx={{ color: '#FFD700', borderColor: '#FFD700', '&:hover': { borderColor: '#FFC300' } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: '#FFD700',
              color: '#121212',
              '&:hover': { backgroundColor: '#FFC300' },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangeTitleModal;
