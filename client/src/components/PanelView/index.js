import { Grid, Box, Container, Paper } from '@material-ui/core'
import React from 'react'

export default function PanelView({ left, right }) {
  return (
    <Container>
      <Box height="100%" m={5} position="relative">
        <Box zIndex={2} width="51%" position="absolute" left="0">
          <Paper elevation={3}>
            <Box p={2} height="80vh" overflow="scrollY">
              {left}
            </Box>
          </Paper>
        </Box>
        <Box width="51%" position="absolute" right="0">
          <Paper elevation={2}>
            <Box pl={5} p={2} height="80vh" overflow="scrollY">
              {right}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  )
}
