import Header from "../components/Header";
import logoBlack from '../assets/logo-black.svg'

export default function Main() {
	return (
		<div className="w-screen h-screen flex md:flex-row flex-col items-center justify-center bg-white">
		<Header active="home"/>
		<section className="w-full md:w-3/4 h-screen flex flex-col items-center justify-center md:gap-y-12">
			<img className="hidden relative md:block w-1/12 opacity-20" src={logoBlack} alt="" />
			<p className="text-brand-400 opacity-20 tracking-tighter flex flex-col items-center gap-y-5">
				<span className="uppercase font-semibold text-3xl">BOOKSUG AI</span>
				<span className="text-2xl w-72 text-center">
					Selecione a opção desejada e comece a explorar
				</span>
			</p>
			
		</section>
	</div>
	)
}