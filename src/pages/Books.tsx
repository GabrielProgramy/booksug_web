import { useEffect, useState } from 'react'
import Books from '../interfaces/Books'
import { getBooks } from '../Services/UserService'
import Header from '../components/Header'
import { Link } from 'react-router-dom'


export default function AllBooks() {
	const [books, setBooks] = useState<Books[]>([])
	const [filteredBooks, setFilteredBooks] = useState<Books[]>([])

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

		
	return (
		<div className="w-screen h-full flex flex-col md:flex-row bg-white">
			<Header active='books'/>

			<section className="w-full md:w-3/4 h-full md:h-screen flex flex-col items-center justify-center gap-y-16 md:gap-y-10">
				<div className="flex flex-col mt-5 md:mt-0 md:flex-row items-center justify-around w-full opacity-80">
					<h3 className='md:text-xl font-medium text-brand-black uppercase tracking-tighter md:self-start text-center  w-56 md:w-auto'>Todos os livros disponiveis</h3>
					<input className="outline-none w-fit md:w-2/4 h-10 bg-white px-2 text-brand-black border-b-2 placeholder:text-brand-black border-brand-black" placeholder="Nome do Livro" type="text" onChange={(e) => handleApplyFilter(e.target.value)} />
				</div>
				
				<div className='shadow-2xl  md:shadow-none scrollbar-none  md:scrollable md:scrollbar-thin md:scrollbar-thumb-scrollbar-thumb md:scrollbar-track-scrollbar-base flex flex-col md:flex-row gap-y-10 md:gap-x-10 md:justify-center items-center max-h-80 md:max-w-4xl md:max-h-[70%] overflow-y-auto md:flex-wrap'>
					{filteredBooks.map(book => (
						<Link to={`/books/description/${book._id}`} className="flex flex-col items-center text-black tracking-tighter font-medium leading-[.85rem] cursor-pointer" key={book._id}>
							<img className="w-40 md:w-44" src={book.cover} alt="" />
							<strong className="text-base uppercase text-brand-black w-56 leading-4 text-center mb-1">{book.name}</strong>
							<span className='text-brand-400 uppercase'>{book.pages} Páginas</span>
							<span className='text-brand-500 uppercase'>{book.gender}</span>
						</Link>
					)) }
				</div>
				
			</section>


		</div>
	)	
}