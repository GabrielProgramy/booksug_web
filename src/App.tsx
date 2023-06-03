import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

import Description from './pages/Description'
import Favorites from './pages/Favorites'
import NewRecommend from './pages/NewRecommend'
import Process from './pages/Process'
import Register from './pages/Register'
import Login from './pages/Login'
import FirstFavorites from './pages/FirstFavorites'
import Main from './pages/Main'
import LastRecommend from './pages/LastRecommend'
import AllBooks from './pages/Books'

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Login />,
		}, {
			path: '/account/new',
			element: <Register />,
		}, {
			path: '/account/new/favorites',
			element: <FirstFavorites />,
		}, {
			path: '/main',
			element: <Main />,
		}, {
			path: '/books',
			element: <AllBooks  />,
		}, {
			path: '/books/favorites',
			element: <Favorites  />,
		}, {
			path: '/books/last',
			element: <LastRecommend  />,
		}, {
			path: '/books/recommend/process',
			element: <Process  />,
		}, {
			path: '/books/recommend/new',
			element: <NewRecommend  />,
		}, {
			path: '/books/description/:id',
			element: <Description  />,
		}
	])
  return (
		<RouterProvider router={router} />
  )
}

export default App
