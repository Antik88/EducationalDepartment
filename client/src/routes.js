import { ADDEVENT_ROUTE, EVENTPAGE_ROUTE, FILTEREVENTPAGE_ROUTE, LOGIN_ROUTE, MAINPAGE_ROUTE, OFFENSIVE_ROUTE, REPORTS_ROUTE } from './utils/consts';
import AddEvent from './pages/AddEvent';
import MainPage from './pages/MainPage';
import OffensivePage from './pages/OffensivePage'
import ReportsPage from './pages/ReportsPage';
import EventPage from './pages/EventPage'
import FilterEvents from './pages/FilterEvents';
import AuthPage from './pages/AuthPage';


export const authRoutes = [
    {
        path: ADDEVENT_ROUTE,
        Component: AddEvent
    },
    {
        path: OFFENSIVE_ROUTE,
        Component: OffensivePage
    },
    {
        path: REPORTS_ROUTE,
        Component: ReportsPage
    },
    {
        path: EVENTPAGE_ROUTE + '/:id',
        Component: EventPage 
    },
    {
        path: FILTEREVENTPAGE_ROUTE,
        Component: FilterEvents 
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthPage 
    },
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage
    },
]