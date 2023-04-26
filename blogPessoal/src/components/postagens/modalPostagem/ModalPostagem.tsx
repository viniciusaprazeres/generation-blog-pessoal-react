import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";

import CadastroPostagem from "../cadastroPostagem/CadastroPostagem";

import "./ModalPostagem.css";

function ModalPostagem() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" className="botaoModal" onClick={handleOpen}>
        Nova Postagem
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal">
          <Box display="flex" justifyContent="flex-end">
            <CloseIcon onClick={handleClose} />
          </Box>

          <CadastroPostagem />
        </div>
      </Modal>
    </div>
  );
}

export default ModalPostagem;
