export type Rental = {
	id: number,
	user_name: string,
	book_id: number,
	quantity: number,
	date: string,
}

export type Book = {
	id: number,
	title: string,
	isbn: string,
	quantity: number,
	remain: number,
	cover_image_url: string,
	borrows: Rental[],
	returns: Rental[],
}

export type Group = {
	id: number,
	str_id: string,
	name: string,
	users: User[]
}

export type User = {
	
}