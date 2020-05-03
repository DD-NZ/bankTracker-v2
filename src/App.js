import React, {useState, useEffect} from 'react';
import './App.scss';
import Header from './components/header/header'
import Data from './components/data/data'
import CustomDrawer from './components/drawer/drawer'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import orange from '@material-ui/core/colors/orange';

const drawerWidth = 300;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: orange,
    background: {
        default: "#424242",
        paper: "#303030",
    },
  },
  typography: {
    htmlFontSize: 12,
  },
  overrides: {
    MuiTableRow: {
      root: {
        "&$selected": { backgroundColor: 'rgba(255, 152, 0, 1);', },
        "&$selected:hover": { backgroundColor: 'rgba(255, 152, 0, 1);', },
      },
    },
    MuiCheckbox: {
     colorSecondary: {
       color: '#ff9800',
       '&$checked': {
         color: '#303030',
       }
     }
   }
}
});


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }
}));


function App() {
  const classes = useStyles();
  const [screenSize, setScreenSize] = useState({});
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState();
  const [filters, setFilters] = useState();
  const [mode, setMode] = useState("load")
  const [resize, setResize] = useState(false)

  const handleDrawerOpen = () => {
    if (data) {
      setOpen(true);
      setTimeout(() => {  setResize(!resize) }, theme.transitions.duration.enteringScreen*4);
    }
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setTimeout(() => {  setResize(!resize) }, theme.transitions.duration.leavingScreen*4);
  };

  useEffect(()=>{
    const updateSize = () => {
      setScreenSize({
        height:  window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  },[])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Header
            classes={classes}
            open={open}
            handleDrawerOpen={handleDrawerOpen}
          />
          <CustomDrawer
            classes={classes}
            open={open}
            handleDrawerClose={handleDrawerClose}
            setFilters={setFilters}
            data={data}
            mode={mode}
            setMode={setMode}
          />
          <Data
            classes={classes}
            open={open}
            setData={setData}
            data={data}
            filters={filters}
            mode={mode}
            setMode={setMode}
            screenSize={screenSize}
            resize={resize}
            setOpen={setOpen}
          />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
