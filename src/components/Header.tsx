import { useEffect, useState } from "react";
import { List, X } from "phosphor-react";
import { Link, useNavigate} from "react-router-dom";
import jwt from 'jwt-decode'
import logo from '../assets/logo.svg'
import profile from '../assets/profile.png'

interface IProps {
	active: 'favorites' | 'newRecommend' | 'recommended' | 'home' | 'books' ;
}


export default function Header({active}: IProps) {
	const [username, setUsername] = useState('')
	const [showMenu, setShowMenu] = useState(false)
	const navigation = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token') as string

		if(!token) navigation('/')

		const user = jwt(token) as any
		setUsername(user.name)
	},[navigation])

	function handleLogout() {
		localStorage.removeItem('token')
		navigation('/')
	}
	
	function handleActive(selected: string) {
		let menu = `bg-brand-400 text-white md:text-xl font-bold leading-5 p-2 md:p-4 hover:bg-brand-100 transition-colors uppercase tracking-tighter md:pl-12 hover:text-brand-400`
	
		if (selected === active) menu ='bg-white text-brand-400 md:text-xl font-bold leading-5 p-2 md:p-4 hover:bg-brand-100 transition-colors uppercase tracking-tighter md:pl-12'

		return menu
	}
	
	function handleMenuName() {
		if (active === 'favorites') return 'Livros Favoritos'
		if (active === 'recommended') return 'Ultimos Indicados'
		if (active === 'newRecommend') return 'Nova Indicação'
		if (active === 'books') return 'Todos os Livros'
	} 
	

	return (
		<header className="w-full md:w-1/4 md:h-screen h-60 flex flex-row md:flex-col items-center md:justify-center gap-x-6  bg-brand-200">
				<List className={`${!showMenu ? 'block' : 'hidden'}  md:hidden ml-5 `} size={32} weight='bold' color="#fff" onClick={() => setShowMenu(!showMenu)}/> 
				{(!showMenu && (active === 'home' ? <img className="ml-14 w-1/6 block md:hidden" src={logo} alt="Logo BookSug AI" /> 
					:<p className="block md:hidden text-xl text-white font-bold leading-5 uppercase">{handleMenuName()}</p>
				))}
				
				<nav className={`md:w-full ${showMenu ? 'flex': 'hidden'} flex-col bg-brand-200 md:bg-transparent md:flex-row md:block md:static relative z-20 md:h-auto h-full pb-10 md:pb-0  top-20 left-0 w-screen`}>
					<div className="flex flex-row items-center justify-start pl-5 md:pl-0 gap-x-4 md:absolute md:top-10 md:left-5 mb-6 md:mb-0 ">
						<X className="block md:hidden right-10 absolute" size={32} weight='bold' color="#fff" onClick={() => setShowMenu(!showMenu)}/> 
						<img className="w-20 h-20 rounded-full" src={profile} alt="" />
						<p className="flex flex-col uppercase text-white font-bold text-xl leading-5">
							{username}
							<span className="text-base text-brand-400 hover:text-brand-100 cursor-pointer transition-colors" onClick={handleLogout}>Sair</span>
						</p>
					</div>

					<ul className="flex flex-col gap-y-4 pb-8 md:pb-0 bg-brand-200">
						<Link to="/books/favorites" className={handleActive('favorites')}>Livros Favoritos</Link>
						<Link to="/books/last" className={handleActive('recommended')} >Ultimos Indicados</Link>
						<Link to="/books/recommend/process" className={handleActive('newRecommend')} >Nova Recomendação</Link>
						<Link to="/books" className={handleActive('books')} >Todos os Livros</Link>
					</ul>
				</nav>
				
			</header>
	)
}