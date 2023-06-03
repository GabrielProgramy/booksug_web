import Header from "../components/Header";
import logoBlack from '../assets/logo-black.svg'
import logoAI from '../assets/ai.svg'
import logoAIWhite from '../assets/ai-white.svg'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Process() {
	const navigation = useNavigate()
	useEffect(() => {
		setTimeout(() => {
			navigation('/books/recommend/new')
		}, 3000)
	
	})

	return (
		<div className="w-screen h-screen flex md:flex-row flex-col items-center justify-center bg-white">
			<Header active="newRecommend"/>
			<section className="hidden w-full md:w-3/4 h-screen md:flex flex-col items-center justify-center md:gap-y-12">
				<img className="invisible relative md:visible w-1/12 opacity-20" src={logoBlack} alt="" />
				<p className="text-brand-400 opacity-20 tracking-tighter flex flex-col items-center gap-y-5">
					<span className="uppercase font-semibold text-3xl">BOOKSUG AI</span>
				</p>
					<span className="text-2xl text-center bg-black absolute w-screen h-screen left-0 flex flex-col items-center justify-center opacity-90">
						<img className="animate-bounce" src={logoAIWhite} alt="" />
						<p className="text-white uppercase w-64 text-center text-2xl tracking-tighter">Processando uma indicação Para você</p>
					</span>
				<div>

				</div>
		</section>
		<section className="w-full md:w-3/4 h-screen flex md:hidden flex-col items-center justify-center gap-y-12">
			<img className="animate-bounce" src={logoAI} alt="" />
			<p className="text-brand-400 uppercase w-56 text-center text-xl tracking-tighter">Processando uma indicação Para você</p>
		</section>
	</div>
	)
}