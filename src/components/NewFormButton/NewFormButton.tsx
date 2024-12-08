import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'

import './NewFormButton.css'

type Props = {
	handleClick: () => void
}

export function NewFormButton({handleClick}: Props) {
  return (
    <Fab id={`NewFormButton`} color="primary" onClick={handleClick}>
      <AddIcon />
    </Fab>
  )
}
