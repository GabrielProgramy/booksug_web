import { X } from 'phosphor-react'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { addOrRemoveFavorite, getBook, getFavorites } from '../Services/UserService'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Books from '../interfaces/Books'

export default function Description() {
	const [book, setBook] = useState<Books>()
	const [textButton, setTextButton] = useState('')
	const [isFavorite, setIsFavorite] = useState(false)
	
	const params = useParams()
	const navigation = useNavigate()
	const location = useLocation()

	useEffect(() => {
		async function getBookDescription() {
			const bookId = params.id as string
			
			const book = await getBook(bookId)
			const favorites = await getFavorites()

			const isFavorite = favorites?.find(favorite => favorite._id === bookId)

			if(isFavorite) setIsFavorite(true)
			
			setBook(book)
		}

		isFavorite ? setTextButton('Remover dos Favoritos') : setTextButton('Adicionar aos Favoritos')
		
		getBookDescription()
	},[params, location, isFavorite])

	async function handleFavoriteOrUnfavorite() {
		await addOrRemoveFavorite(book?._id as string)

		setTextButton(isFavorite ? 'Adicionar aos Favoritos' : 'Remover dos Favoritos')
		setIsFavorite(!isFavorite)

		navigation('/books/favorites')
	
	}

	return (
		<div className="w-screen h-screen flex flex-col md:flex-row bg-white">

			<section className="w-full md:w-3/4 h-screen flex flex-col items-center  gap-y-10 text-black">
				<div className='flex flex-row justify-evenly md:justify-start items-center w-72 -left-2 md:w-full relative mt-10 md:mt-20'>
					<h2 className='md:relative md:left-64 text-2xl uppercase tracking-tighter font-medium text-brand-400'>Descrição</h2>
					<X className='cursor-pointer absolute right-0' size={32} weight='bold' color='#40254D' onClick={() => navigation(-1)}/>
				</div>

				<div className='flex flex-col md:flex-row px-4 md:relative left-64 w-full h-full md:gap-x-10'>
					<img className="w-44 md:w-3/12 md:h-fit" src={book?.cover} alt="" />
					<div className='mt-6 flex flex-col leading-4'>
						<h2 className='text-2xl uppercase tracking-tighter font-medium text-brand-black'>{book?.name}</h2>
						<span className='text-sm uppercase tracking-tighter font-medium text-brand-400'>{book?.authors}</span>
						<span className='text-base uppercase tracking-tighter font-medium text-brand-300'>{book?.pages} Páginas</span>
						<span className='text-sm uppercase tracking-tighter font-medium text-brand-100'>{book?.gender}</span>
						<p className='text-brand-black h-24 overflow-y-auto my-5 leading-tight md:h-44 md:w-[30rem]'>
							{book?.synopsis}
							<br/><br/> <span className='uppercase tracking-tighter font-medium text-brand-300'>{book?.publishing} - {book?.release}</span>
						</p>

						<button className="bg-brand-200 text-white hover:bg-brand-100 transition-colors" onClick={handleFavoriteOrUnfavorite}>
							{textButton}
						</button>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)	
}