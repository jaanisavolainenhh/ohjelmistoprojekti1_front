import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, Hidden,
  Drawer, CssBaseline, MenuList, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Menu } from '@material-ui/icons'
import { compose } from 'recompose'
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336

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
    /*width: '65%',
    display: 'flex',
    justifyContent: 'center',*/
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
    position: 'relative', // Siirtää drawerin linkit vasempaan reunaan kun tää on kommentoituna
    },
  },
  content: {
    width: '100%',
    flexGrow: 1,
    //backgroundColor: theme.palette.background.default, // Tämä vaikuttaa koko sivun taustaväriin
    //padding: theme.spacing(3),
  },
  //nested incase we want nest smth (probably not)
  //nested: {
    //paddingLeft: theme.spacing(4),
  //},
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
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
        <MenuItem component={Link} to="/" selected={'/' === pathname}>
            Kysely
          </MenuItem>
          <MenuItem component={Link} to="/vastaukset" selected={'/vastaukset' === pathname}>
            Vastaukset
          </MenuItem>
          <MenuItem component={Link} to="/tarkastelu" selected={'/tarkastelu' === pathname}>
            Tarkastelu
          </MenuItem>
          <MenuItem component={Link} to="/uusikysely" selected={'/uusikysely' === pathname}>
            UusiKysely
          </MenuItem>
          <MenuItem component={Link} to="/kyselynmuokkaus" selected={'/kyselynmuokkaus' === pathname}>
            KyselynMuokkaus
          </MenuItem>
          <MenuItem component={Link} to="/kyselyOneByOne" selected={'/kyselyOneByOne' === pathname}>
            KyselyOneByOne
          </MenuItem>
        </MenuList>
      </div>
    )
    // ln:86, Baseline css helps convert everything to work in different browsers (needs to be inside fragment)
    return <Fragment>
      <CssBaseline/>

      <div className={classes.root}>
        <AppBar /*position="absolute"*/ color="default" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}>
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Kysely äppi
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
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