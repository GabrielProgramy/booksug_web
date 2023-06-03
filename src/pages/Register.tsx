import { useState } from 'react'
import logo from '../assets/logo.svg'
import { login, register } from '../Services/UserService'
import { Link, useNavigate } from 'react-router-dom'

interface IUser { 
	name: string, email: string, password: string, confirmPassword: string
}


export default function Register() {
	const [user, setUser] = useState<IUser>({} as IUser)
	const navigate = useNavigate()


	async function handleRegistration(e:any) {
		e.preventDefault()

		if(user.name === '' || user.email === '' || user.password === '' || user.confirmPassword === '') {
			alert('Preencha todos os campos')
			return
		}

		if(user.password !== user.confirmPassword) {
			alert('Senhas não conferem')
			return
		}

		register(user).then(async () => {
			const response = await login(user.email, user.password)
			localStorage.setItem('token', response.token)
			navigate('/account/new/favorites')
		})
	}

	return(
		<div className="flex flex-col md:flex-row items-start justify-between w-screen">
			<section className="flex flex-col items-center justify-center w-screen h-64 md:w-1/2 md:h-screen md:gap-5 tracking-tighter">
				<img className="w-1/6 mb-4" src={logo} alt="Logo BookSug AI" />
				<h1 className="text-3xl md:text-4xl font-semibold uppercase">BookSug AI</h1>
				<p className="text-base md:text-2xl md:w-72 text-center">Receba indicações de livros personalizados</p>
			</section>

			<section className="flex flex-col w-screen md:w-1/2 h-screen md:h-screen bg-white">
				<p className='invisible md:visible text-brand-200 md:mt-28 mb-10 md:mb-20 ml-24 font-medium text-4xl uppercase tracking-tighter'>Nova Conta</p>

				<div className='flex flex-col items-center justify-center gap-4'>
					<input className='w-8/12 border-2 outline-none text-brand-black border-brand-200 p-2 rounded-md bg-transparent placeholder:text-brand-200' placeholder='Nome' type="text" name="name" id="" onChange={(e) => setUser({...user, name: e.target.value})} />
					<input className='w-8/12 border-2 outline-none text-brand-black border-brand-200 p-2 rounded-md bg-transparent placeholder:text-brand-200' placeholder='Email' type="email" name="email" id="" onChange={(e) => setUser({...user, email: e.target.value})} />
					<input className='w-8/12 border-2 outline-none text-brand-black border-brand-200 p-2 rounded-md bg-transparent placeholder:text-brand-200' placeholder='Senha'type="text" name="password" id="" onChange={(e) => setUser({...user, password: e.target.value})} />
					<input className='w-8/12 border-2 outline-none text-brand-black border-brand-200 p-2 rounded-md bg-transparent placeholder:text-brand-200' placeholder='Confirmar a Senha'type="text" name="confirmPassword" id="" onChange={(e) => setUser({...user, confirmPassword: e.target.value})}/>
					<button className='bg-brand-200 hover:bg-brand-300 transition-colors  text-white p-2 rounded-md w-7/12 md:mt-10' onClick={(e) => handleRegistration(e)}>
						Cadastrar
					</button>
					<Link to="/" className='text-brand-200 hover:text-brand-300 transition-colors'>
						Fazer Login
					</Link>
				</div>
			</section>
		</div>
	)
}