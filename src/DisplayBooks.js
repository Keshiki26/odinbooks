import { Grid, IconButton, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleButton from '@material-ui/lab/ToggleButton';

const DisplayBooks = (props) => {
	const [changeBook, setChangeBook] = useState(null);
	const [bookValue, setBookValue] = useState({
		title: '',
		author: '',
		pages: '',
		read: false,
	});
	useEffect(() => {
		if (props.modalDisplay) {
			setChangeBook(null);
			setBookValue({
				title: '',
				author: '',
				pages: '',
				read: false,
			});
		}
	});

	return (
		<Grid item container>
			{props.books.map((book, index) => (
				<Grid
					item
					xs={12}
					md={6}
					lg={4}
					key={index}
					direction="column"
					className="books-display-cont"
					container
					justify="center"
				>
					<Grid
						item
						className={`books-text-cont ${book.read ? 'read' : 'not-read'}`}
						container
						alignItems="center"
						justify="center"
					>
						<Grid item xs={12} className="topbar-book">
							<IconButton>
								{changeBook === book && (
									<DoneIcon
										className="bin"
										fontSize="large"
										onClick={() => {
											if (
												bookValue.author !== '' &&
												bookValue.title !== '' &&
												!isNaN(bookValue.pages) &&
												bookValue.pages !== ''
											) {
												const nb = [...props.books];
												nb[index] = bookValue;
												localStorage.setItem('books', JSON.stringify(nb));
												props.refreshBooks();
												setChangeBook(null);
											}
										}}
									/>
								)}
								{changeBook === null && (
									<EditIcon
										className="bin"
										fontSize="large"
										onClick={() => {
											setBookValue(book);
											setChangeBook(book);
										}}
									/>
								)}
							</IconButton>
							<IconButton
								onClick={() => {
									props.books.splice(index, 1);
									localStorage.setItem('books', JSON.stringify(props.books));
									setChangeBook(null);
									setBookValue({
										title: '',
										author: '',
										pages: '',
									});

									props.refreshBooks();
								}}
							>
								<DeleteForeverIcon className="bin" fontSize="large" />
							</IconButton>
						</Grid>
						<Grid
							item
							xs={12}
							alignItems="center"
							justify="center"
							direction="column"
							className="books-display-texts"
							container
						>
							{changeBook === book && (
								<Grid
									item
									alignItems="center"
									className="change-one"
									container
									direction="column"
								>
									<TextField
										variant="filled"
										value={bookValue.title}
										onChange={(e) => {
											setBookValue({
												title: e.target.value,
												author: bookValue.author,
												pages: bookValue.pages,
												read: bookValue.read,
											});
										}}
										color="secondary"
										placeholder="Title"
										inputProps={{ className: 'input-change-one' }}
										className="books-display change-input"
									></TextField>
									<TextField
										variant="filled"
										color="secondary"
										value={bookValue.author}
										onChange={(e) => {
											setBookValue({
												title: bookValue.title,
												author: e.target.value,
												pages: bookValue.pages,
												read: bookValue.read,
											});
										}}
										placeholder="Author"
										inputProps={{ className: 'input-change-one' }}
										className="books-display change-input"
									></TextField>
									<TextField
										variant="filled"
										value={bookValue.pages}
										onChange={(e) => {
											setBookValue({
												title: bookValue.title,
												author: bookValue.author,
												pages: e.target.value,
												read: bookValue.read,
											});
										}}
										color="secondary"
										placeholder="Pages"
										inputProps={{ className: 'input-change-one' }}
										className="books-display change-input"
									></TextField>
									{bookValue.read && (
										<ToggleButton
											className="toggleb"
											onClick={() => {
												setBookValue({
													title: bookValue.title,
													author: bookValue.author,
													pages: bookValue.pages,
													read: !bookValue.read,
												});
											}}
										>
											Read
											<ToggleOnIcon fontSize="large" />
										</ToggleButton>
									)}
									{!bookValue.read && (
										<ToggleButton
											className="toggleb"
											onClick={() => {
												setBookValue({
													title: bookValue.title,
													author: bookValue.author,
													pages: bookValue.pages,
													read: !bookValue.read,
												});
											}}
										>
											Not Read
											<ToggleOffIcon fontSize="large" />
										</ToggleButton>
									)}
								</Grid>
							)}
							{changeBook !== book && (
								<Grid item container direction="column" className="n">
									<Typography variant="h4" className="books-display title">
										{book.title}
									</Typography>
									<Typography variant="h6" className="books-display author">
										{book.author}
									</Typography>
									<Typography className="books-display pages">
										Pages Read: {book.pages}
									</Typography>
									{book.read && (
										<ToggleButton
											className="toggleb"
											onClick={() => {
												const nb = [...props.books];
												nb[index] = {
													title: book.title,
													author: book.author,
													pages: book.pages,
													read: !book.read,
												};
												localStorage.setItem('books', JSON.stringify(nb));
												props.refreshBooks();
											}}
										>
											Read
											<ToggleOnIcon fontSize="large" />
										</ToggleButton>
									)}
									{!book.read && (
										<ToggleButton
											className="toggleb"
											onClick={() => {
												const nb = [...props.books];
												nb[index] = {
													title: book.title,
													author: book.author,
													pages: book.pages,
													read: !book.read,
												};
												localStorage.setItem('books', JSON.stringify(nb));
												props.refreshBooks();
											}}
										>
											Not Read
											<ToggleOffIcon fontSize="large" />
										</ToggleButton>
									)}
								</Grid>
							)}
						</Grid>
					</Grid>
				</Grid>
			))}
		</Grid>
	);
};
export default DisplayBooks;
