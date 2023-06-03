import { X } from 'phosphor-react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { addOrRemoveFavorite, recomendation } from '../Services/UserService'
import Books from '../interfaces/Books'

export default function NewRecommend() {
	const [book, setBook] = useState<Books>()
	const [textButton, setTextButton] = useState('Adicionar aos Favoritos')
	const [isFavorite, setIsFavorite] = useState(false)
	const navigation = useNavigate()


	useEffect(() => {
		async function fetchData() {
			const book = await recomendation()

			setBook(book)
		}
		fetchData()
	
	},[])

	async function handleFavoriteOrUnfavorite() {
		await addOrRemoveFavorite(book?._id as string)

		setTextButton(isFavorite ? 'Adicionar aos Favoritos' : 'Remover dos Favoritos')
		setIsFavorite(!isFavorite)

		navigation('/books/favorites')
	
	}

	return (
		<div className="w-screen h-full flex flex-col md:flex-row bg-white">
			<Header active='newRecommend'/>
			{book ? (
				<div>
					<div className='hidden md:flex flex-row justify-start items-center w-full relative mt-20'>
						<h2 className='relative left-24 text-2xl uppercase tracking-tighter font-medium text-brand-400'>Livro Indicado</h2>
						<Link className='absolute right-0' to='/main'>
							<X className='cursor-pointer ' size={32} weight='bold' color='#40254D'/>
						</Link>
					</div>
				<section className="w-full md:w-3/4 h-screen md:h-fit flex flex-col items-center md:mt-20 gap-y-10 text-black">
			
				
					<div className='flex flex-col md:flex-row px-4 md:relative left-36 w-full h-full md:gap-x-10'>
						<img className="w-44 md:w-7/12 md:h-fit" src={book?.cover} alt="" />
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
				</div>
				): (
					
					<h1 className='w-full flex justify-center items-center text-2xl text-brand-400'>Sem indicações no momento.</h1>
				
				)}
			

			<Footer />
		</div>
	)	
}