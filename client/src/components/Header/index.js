import { Typography, Box, withStyles } from '@material-ui/core'
import React from 'react'

import './Header.scss'

const WhiteText = withStyles({
  root: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
})(Typography)

export default function Header({ viewName }) {
  return (
    <header className="header">
      <Box m={2}>
        <WhiteText
          variant="h5"
        >
          {viewName}
        </WhiteText>
      </Box>
    </header>
  )
}
