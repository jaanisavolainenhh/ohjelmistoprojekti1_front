import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  AppBar, Toolbar, IconButton, Typography, Hidden,
  Drawer, CssBaseline, MenuList, MenuItem
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Menu } from '@material-ui/icons'
import { compose } from 'recompose'

const drawerWidth = 225

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'static',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: '65px'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('xs')]: {
      position: 'absolute',
      height: 'calc(100% - 60px)', top: 65
    },
  },
  content: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.default,
    // padding: theme.spacing(3),
  },
})

class Layout extends Component {
  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render() {

    const { classes, location: { pathname }, children } = this.props   // children is referring to content inside "Route" inside App.js
    const { mobileOpen } = this.state

    const drawer = (
      <div className={classes.toolbar}>
        <MenuList>
          {/* <MenuItem component={Link} to="/kysely" selected={'/kysely' === pathname} onClick={this.handleDrawerToggle}>
            Kysely
          </MenuItem>
          <MenuItem component={Link} to="/vastaukset" selected={'/vastaukset' === pathname} onClick={this.handleDrawerToggle}>
            Vastaukset
          </MenuItem> */}
          <MenuItem component={Link} to="/tarkastelu" selected={'/tarkastelu' === pathname} onClick={this.handleDrawerToggle}>
            Tarkastelu
          </MenuItem>
          {/* <MenuItem component={Link} to="/uusikysely" selected={'/uusikysely' === pathname} onClick={this.handleDrawerToggle}>
            UusiKysely
          </MenuItem> */}
          <MenuItem component={Link} to="/kyselynmuokkaus" selected={'/kyselynmuokkaus' === pathname} onClick={this.handleDrawerToggle}>
            Kyselyn Muokkaus / Lisäys
          </MenuItem>
          <MenuItem component={Link} to="/kyselyOneByOne" selected={'/kyselyOneByOne' === pathname} onClick={this.handleDrawerToggle}>
            Kysely
          </MenuItem>
          {/* <MenuItem component={Link} to="/uusitarkastelu" selected={'/uusitarkastelu' === pathname} onClick={this.handleDrawerToggle}>
            Chartit
          </MenuItem> */}
        </MenuList>
      </div>
    )
    // ln:86, Baseline css helps convert everything to work in different browsers (needs to be inside fragment)
    return <Fragment>
      <CssBaseline />

      <div className={classes.root}>
        <AppBar color="default" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}

            >
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Kysely
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          //Style={{height: 'calc(100% - 24px)', top: 24}}
          open={mobileOpen}
          onClose={this.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbar}> {drawer} </div>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </Fragment>
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(Layout)