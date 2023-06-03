import { useEffect, useState } from 'react'
import { X } from 'phosphor-react'
import logo from '../assets/logo-black.svg'
import Books from '../interfaces/Books'
import { addFavorite, getBooks } from '../Services/UserService'
import { useNavigate } from 'react-router-dom'


export default function FirstFavorites() {
	const [books, setBooks] = useState<Books[]>([])
	const [filteredBooks, setFilteredBooks] = useState<Books[]>([])
	const [booksSelected, setBooksSelected] = useState<Books[]>([])
	const navigate = useNavigate()

	function handleSelectBook(selectedBook: Books) {
		if (booksSelected.length === 5) alert('Você já selecionou 5 livros!')

		if (booksSelected.length < 5) {
			const index = filteredBooks.findIndex(book => book._id === selectedBook._id)
			filteredBooks.splice(index, 1)
			const index2 = books.findIndex(book => book._id === selectedBook._id)
			books.splice(index2, 1)
		
			setBooksSelected(prevState => [...prevState, selectedBook])
		}
	}

	function handleApplyFilter(value: string) {
		if (value === '') {
			setFilteredBooks(books)
		}
		const filtered = books.filter(book => book.name.toLowerCase().includes(value.toLowerCase()))
		setFilteredBooks(filtered)
	}

	useEffect(() => {
		async function getAllBooks() {
			const favorites = await getBooks()

			setBooks(favorites)
			setFilteredBooks(favorites)
		
		}
		getAllBooks()
	},[])

	async function addFavorites() {
		
		const favorites = booksSelected.map(book => book._id)
		
		const response = await addFavorite(favorites)

		if(response) {
			alert('Livros adicionados com sucesso!')
			navigate('/main')
		}
	}
	
	return (
		<div className="w-screen h-full flex flex-col md:flex-row bg-white">
			<header className="w-fit md:w-1/4 md:h-screen h-60 flex flex-col items-center justify-center gap-y-8 md:gap-y-20  bg-brand-200">
				<img className="w-1/4 md:w-4/12" src={logo} alt="Logo BookSug AI" />
				
				
				<div className="flex flex-col items-center justify-center gap-y-2 w-fit">
					<input className="w-full md:w-3/4 h-10 rounded-md bg-white px-2 text-brand-black shadow-md" placeholder="Nome do Livro" type="text" onChange={(e) => handleApplyFilter(e.target.value)} />
				</div>
			</header>

			<section className="w-full md:w-3/4 h-full md:h-screen flex flex-col items-center justify-center gap-y-16 md:gap-y-10">
				<h3 className='md:text-xl font-medium text-brand-black uppercase tracking-tighter md:self-start text-center md:ml-10 w-56 md:w-auto'>Antes de prosseguir, escolha 5 livros favoritos da nossa base de dados</h3>
				
				<div className='overflow-x-auto max-w-[260px] md:max-w-3xl whitespace-nowrap px-2'>
					<ul className='inline-flex space-x-4'>
						{booksSelected.map(book => (
							<li className='flex flex-row items-center justify-center bg-brand-200 rounded p-2 gap-4' key={book._id}>
								<p className='text-white uppercase tracking-tighter text-center text-sm md:text-base'>{book.name}</p>
								<X size={20} className='cursor-pointer' color='#FFF' weight='bold' onClick={() => {
									const index = booksSelected.findIndex(book => book._id === book._id)
									booksSelected.splice(index, 1)
									setFilteredBooks(prevState => [...prevState, book])
									setBooks(prevState => [...prevState, book])
								}}/>
							</li>
						))}
					</ul>
				</div>
				<div className='flex flex-col md:flex-row gap-y-10 md:gap-x-10 md:justify-center items-center max-h-80 md:max-w-[839px] md:max-h-[310px] overflow-y-auto md:flex-wrap'>
					{filteredBooks.map(book => (
						<div className="flex flex-col items-center text-black tracking-tighter font-medium leading-[.85rem] cursor-pointer" key={book._id} onClick={() => handleSelectBook(book)}>
							<img className="w-40 md:w-44" src={book.cover} alt="" />
							<strong className="text-base uppercase text-brand-black w-56 leading-4 text-center mb-1">{book.name}</strong>
							<span className='text-brand-400 uppercase'>{book.pages} Páginas</span>
							<span className='text-brand-500 uppercase'>{book.gender}</span>
						</div>
					)) }
				</div>
				{booksSelected.length === 5 && (
					<button className="bg-brand-400 w-fit mb-10 md:mb-0" onClick={() => addFavorites()}>
						Concluir Cadastro
					</button>
				)}
			</section>


		</div>
	)	
}