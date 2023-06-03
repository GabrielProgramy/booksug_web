import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../Services/UserService'


export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		if(localStorage.getItem('token')) navigate('/main')
	
	},[navigate])

	

	const handleLogin = async (e: any) => {
		e.preventDefault()
		
		const response = await login(email, password)
		
		localStorage.setItem('token', response.token)
		
		if(response.token) navigate('/main')
		
	}


	return(
		<div className="flex flex-col md:flex-row items-start justify-between w-screen">
			<section className="flex flex-col items-center justify-center w-screen h-64 md:w-1/2 md:h-screen md:gap-5 tracking-tighter">
				<img className="w-1/6 mb-4" src={logo} alt="Logo BookSug AI" />
				<h1 className="text-3xl md:text-4xl font-semibold uppercase">BookSug AI</h1>
				<p className="text-base md:text-2xl md:w-72 text-center">Receba indicações de livros personalizados</p>
			</section>

			<section className="flex flex-col w-screen md:w-1/2 h-screen md:h-screen bg-white">
				<p className='invisible md:visible text-brand-200 md:mt-28 mb-10 md:mb-20 ml-24 font-medium text-4xl uppercase tracking-tighter'>Login</p>

				<form className='flex flex-col items-center justify-center gap-10'>
					<input className='w-8/12 border-2 outline-none text-brand-black border-brand-200 p-2 rounded-md bg-transparent placeholder:text-brand-200' placeholder='Email' type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
					<input className='w-8/12 border-2 outline-none text-brand-black border-brand-200 p-2 rounded-md bg-transparent placeholder:text-brand-200' placeholder='Senha'type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
					<button className='bg-brand-200 hover:bg-brand-300 transition-colors  text-white p-2 rounded-md w-7/12 md:mt-10 hover:text-white flex justify-center' onClick={handleLogin}>
						Entrar
					</button>
					<Link className='text-brand-200 hover:text-brand-300 transition-colors' to='/account/new'>
						Criar Conta
					</Link>
				</form>
			</section>
		</div>
	)
}