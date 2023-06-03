import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Books from '../interfaces/Books'
import { getFavorites } from '../Services/UserService'
import { Link } from 'react-router-dom'

export default function Favorites() {
	const [booksFavorites, setBooksFavorites] = useState<Books[]>([])

	useEffect(() => {
		async function getBooks() {
			const favorites = await getFavorites()

			setBooksFavorites(favorites as Books[])
		}
		getBooks()
	},[booksFavorites])



	return (
		<div className="w-screen h-screen flex flex-col md:flex-row bg-white">
			<Header active='favorites'/>

			<section className="w-full md:w-3/4 h-screen flex flex-col items-center justify-center gap-y-10">
				
				<div className='flex flex-col md:flex-row gap-y-10 md:gap-x-10 md:justify-center items-center max-h-80 md:max-w-[839px] md:max-h-[310px] overflow-y-auto md:flex-wrap'>
					{booksFavorites.length > 0 ? booksFavorites.map(book => (
						<Link state={{ route: 'favorites'}} to={`/books/description/${book._id}`} className="flex flex-col items-center text-black tracking-tighter font-medium leading-[.85rem]" key={book._id}>
							<img className="w-40 md:w-44" src={book.cover} alt="" />
							<strong className="text-base uppercase text-brand-black w-56 leading-4 text-center mb-1">{book.name}</strong>
							<span className='text-brand-400 uppercase'>{book.pages} Páginas</span>
							<span className='text-brand-500 uppercase'>{book.gender}</span>
						</Link>
					)) : <h1 className='text-brand-black text-center uppercase tracking-tighter text-2xl'>Você não tem livros favoritos!</h1>}
				</div>
			</section>

			<Footer />
		</div>
	)	
}