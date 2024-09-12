// Importing necessary components from 'react-router-dom' for routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, LegoDetails } from './pages';
import SearchContextComponent from './components/context/SearchContextComponent.jsx';
import Header from './components/header';
import './index.css';

/**
 * The main application component that sets up routing and context for the app.
 * 
 * This component uses React Router to define the application's routes. 
 * It wraps the application in a context provider and includes a header component.
 * 
 * - `<Router>`: Provides routing functionality for the application.
 * - `<SearchContextComponent>`: Context provider for search functionality.
 * - `<Header>`: Header component displayed on all pages.
 * - `<Routes>`: Defines the available routes in the application.
 * - `<Route path="/" element={<Home />}/>`: Route for the home page.
 * - `<Route path="/legoset/:id" element={<LegoDetails />}/>`: Route for displaying details of a specific Lego set based on the ID.
 * 
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
    return (
        <Router>
            <SearchContextComponent>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/legoset/:id" element={<LegoDetails />} />
                </Routes>
            </SearchContextComponent>
        </Router>
    );
}

export default App;
