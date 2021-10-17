import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";
import Layout from "components/Layout/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "Pages/Home";
import Menu from "Pages/Menu";
import Book from "Pages/Book";

const secondary = "#F9F9F9";

const theme = createTheme({
  palette: {
    primary: deepOrange,
    secondary: {
      main: secondary,
    },
    background: {
      default: secondary,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/menu" component={Menu} />
              <Route exact path="/book" component={Book} />
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
