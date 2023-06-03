import Books from "../interfaces/Books"

const baseUrl = import.meta.env.VITE_API_URL

export async function register({ name, email, password }: { name: string, email: string, password: string }) {
	try {
		const response = await fetch(`${baseUrl}/users`, {
			method: 'POST',
			body: JSON.stringify({
				name,
				email,
				password
			}),
			headers: { 'Content-Type': 'application/json' }
		})

		if (!response.ok) throw new Error(response.statusText)

		return response.json()
	} catch (error) {
		// console.log(error)

		alert('=( houve um erro ao fazer login!')
	}
}

export async function login(email: string, password: string) {
	try {
		const response = await fetch(`${baseUrl}/users/auth`, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			}),
			headers: { 'Content-Type': 'application/json' }
		})

		if (!response.ok) throw new Error(response.statusText)

		return response.json()
	} catch (error) {
		// console.log(error)

		alert('=( houve um erro ao fazer login!')
	}
}

export async function getFavorites() {
	try {
		const response = await fetch(`${baseUrl}/users/books/favorites`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})

		if (!response.ok) throw new Error(response.statusText)

		return response.json() as Promise<Books[]>
	} catch (error) {
		alert('=( houve um erro ao buscar seus livros favoritos!')
	}
}

export async function getBook(id: string) {
	try {
		const response = await fetch(`${baseUrl}/books/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})

		if (!response.ok) throw new Error(response.statusText)

		return response.json()
	} catch (error) {
		alert('=( houve um erro ao buscar o livro!')
	}
}




export async function getBooks() {
	try {
		const response = await fetch(`${baseUrl}/books`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})

		if (!response.ok) throw new Error(response.statusText)

		return response.json()
	} catch (error) {
		alert('=( houve um erro ao buscar o livro!')
	}
}

export async function getLastRecommendations() {
	try {

		const response = await fetch(`${baseUrl}/users/last-recommends`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})

		if (!response.ok) throw new Error(response.statusText)

		return response.json()
	} catch (error) {
		alert('=( houve um erro ao buscar o livro!')
	}
}

export async function addOrRemoveFavorite(bookId: string) {
	try {
		const response = await fetch(`${baseUrl}/users/books/${bookId}/favorite`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})

		if (!response.ok) throw new Error(response.statusText)

		return
	} catch (error) {
		alert('=( houve um erro ao favoritar o livro!')
	}
}

export async function addFavorite(booksFavorites: Array<string>) {
	try {
		const response = await fetch(`${baseUrl}/users/books/favorites/add`, {
			method: 'POST',
			body: JSON.stringify({
				booksFavorites
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})

		if (!response.ok) throw new Error(response.statusText)

		return response.ok
	} catch (error) {
		// console.log(error)

		alert('=( houve um erro ao adicionar seus favoritos!')
	}
}

export async function recomendation() {
	try {
		const response = await fetch(`${baseUrl}/users/recommends`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})

		if (!response.ok) throw new Error(response.statusText)

		return response.json()
	} catch (error) {
		// console.log(error)

		alert('=( houve um erro ao adicionar seus favoritos!')
	}
}