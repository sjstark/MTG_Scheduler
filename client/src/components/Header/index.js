import { Typography, Box, withStyles } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'

import './Header.scss'

const WhiteText = withStyles({
  root: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
})(Typography)

function Header({ view }) {
  return (
    <header className="header">
      <Box m={2}>
        <WhiteText
          variant="h5"
        >
          {view}
        </WhiteText>
      </Box>
    </header>
  )
}

const mapStateToProps = (state) => {
  const { view } = state
  return { view }
}

export default connect(mapStateToProps)(Header)
