export default interface User {
	_id?: string;
	name?: string;
	email?: string;
	password?: string;
	booksSug?: Array<{
		id: string;
	}>
	booksFavorites?: Array<string>
}
