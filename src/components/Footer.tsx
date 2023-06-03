import logo from '../assets/logo-colors.svg'

export default function Footer() {
	return (
		<footer className='hidden md:flex items-center absolute bottom-0 right-4 gap-x-4 p-2'>
			<img className='w-12 object-contain' src={logo} alt="" />
			<span className='text-brand-200 font-medium uppercase'>BookSug AI</span>
		</footer>
	)
}