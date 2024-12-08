import { Modal, Paper } from '@mui/material'

import { StateArgumentType } from '@/types'

import './ModalWrapper.css'

type Props = {
  children: JSX.Element
  openState: StateArgumentType<boolean>
}

export function ModalWrapper({ children, openState }: Props) {
  const [open, setOpen] = openState

  function handleClose(event: React.MouseEvent) {
    event.stopPropagation()
    setOpen(false)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper className="Modal">{children}</Paper>
    </Modal>
  )
}
