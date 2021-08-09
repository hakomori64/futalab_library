export type Rental = {
	id: number,
	user_id: number,
	user: User,
	quantity: number,
	date: string,
	type: "borrow" | "return",
	book_id: number,
	book: Book,
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
	id: number,
	name: string,
	email: string
}

export type Borrow = {
	id: number,
	user_id: number,
	group_id: number,
	book_id: number,
	quantity: number,
}

export type Return = {
	id: number,
	user_id: number,
	group_id: number,
	book_id: number,
	quantity: number,
}

export type Invitation = {
	id: number,
	user_id: number,
	user: User,
	group_id: number,
	group: Group
}