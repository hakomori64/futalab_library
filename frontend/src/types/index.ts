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
	cover_image_url: string,
	borrows: Rental[],
	returns: Rental[],
}