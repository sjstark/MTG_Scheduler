import { Box, Container, Button, Fab, Dialog } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import { initialLoadProjects, loadNewProjects } from '../../../../store/projects'
import ProjectMonth from './ProjectMonth'

import AddIcon from '@material-ui/icons/Add'

import InfiniteScroll from 'react-infinite-scroll-component'
import AddProject from './AddProject'

function ProjectsOverview({ range, projects, total, loaded }) {
  const dispatch = useDispatch()
  const [openAddProject, setOpenAddProject] = useState(false)

  useEffect(() => {
    if (range.length == 0) {
      dispatch(initialLoadProjects())
    }
  }, [])

  useEffect(() => {
    console.log(range)
  }, [range])

  const loadMoreProjects = () => {
    let start = range[range.length - 1]
    start = start.split("-")
    start[1] = parseInt(start[1]) + 1
    if (start[1] > 12) {
      start[0] = parseInt(start[0]) + 1
      start[1] = 1
    }
    start = start.join("-")
    console.log(start)
    console.log({ total, loaded })
    if (total <= loaded) {
      console.log('no more projects to load')
    } else {
      dispatch(loadNewProjects(start))
    }
  }



  return (
    <>
      <Fab
        onClick={() => setOpenAddProject(true)}
        color="primary"
        style={{
          position: 'fixed',
          top: 90,
          right: 30
        }}
      >
        <AddIcon />
      </Fab>
      <Container>

        <Box display="flex" flexDirection="column">

          {range.map((el) => (
            <ProjectMonth key={`month-${el}`} month={el} projects={projects[el]} />
          ))}
          {loaded < total && <Button onClick={loadMoreProjects}>Load More Projects</Button>}
        </Box>
      </Container>
      <AddProject
        onClose={() => setOpenAddProject(false)}
        open={openAddProject}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  range: state.projectsData.range,
  projects: state.projectsData.projects,
  total: state.projectsData.total,
  loaded: state.projectsData.loaded,
})


export default connect(mapStateToProps)(ProjectsOverview)
