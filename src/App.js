import React from 'react';
import {
	AppBar,
	Button,
	Grid,
	IconButton,
	Toolbar,
	Typography,
} from '@material-ui/core';
import AddBookModal from './AddBookModal';
import DisplayBooks from './DisplayBooks';
import AddIcon from '@material-ui/icons/Add';

class App extends React.Component {
	constructor(props) {
		super(props);
		console.log(JSON.parse(localStorage.getItem('books')));
		this.state = {
			modalDisplay: false,
			books: JSON.parse(localStorage.getItem('books')) || [
				{
					pages: '1250',
					title: 'Les Misérables',
					author: 'Victor Hugo',
					read: false,
				},
				{
					pages: '300',
					title: 'Norwegian Wood',
					author: 'Haruki Murakami',
					read: true,
				},
				{
					title: 'One Piece',
					author: 'Eiichiro Oda',
					pages: '1000',
					read: true,
				},
				{
					title: 'The Count of Monte Cristo',
					author: 'Alexandre Dumas',
					pages: '1400',
					read: true,
				},
			],
		};
	}
	changeModal = () => {
		this.setState({ modalDisplay: !this.state.modalDisplay });
	};
	refreshBooks = () => {
		this.setState({
			books: JSON.parse(localStorage.getItem('books')) || [
				{
					pages: '1250',
					title: 'Les Misérables',
					author: 'Victor Hugo',
					read: false,
				},
				{
					pages: '300',
					title: 'Norwegian Wood',
					author: 'Haruki Murakami',
					read: true,
				},
				{
					title: 'One Piece',
					author: 'Eiichiro Oda',
					pages: '1000',
					read: true,
				},
				{
					title: 'The Count of Monte Cristo',
					author: 'Alexandre Dumas',
					pages: '1400',
					read: true,
				},
			],
		});
	};
	render() {
		return (
			<Grid container>
				<Grid item container justify="flex-end">
					<Button
						onClick={this.changeModal}
						edge="start"
						color="inherit"
						aria-label="menu"
					>
						+ Add New Book
					</Button>
				</Grid>
				<Grid
					item
					container
					xs={11}
					direction="column"
					justify="center"
					alignItems="center"
				>
					<Grid item xs={10} className="titlePage-c">
						<a href="https://github.com/Keshiki26/odinbooks" target="_blank">
							<Typography variant="h3" className="titlePage-title">
								PROJECT: LIBRARY
							</Typography>
							<Typography>
								Made with <strong className="scon">react</strong> and has
								<strong className="scon"> functioning </strong>{' '}
								<i className="scon">local storage</i> useage
							</Typography>
						</a>
					</Grid>
				</Grid>
				{this.state.books.length === 0 && (
					<Grid
						item
						container
						direction="column"
						justify="center"
						alignItems="center"
					>
						<Grid>
							<Button onClick={this.changeModal}>
								Add A New Book
								<AddIcon fontSize="large"></AddIcon>
							</Button>
						</Grid>
					</Grid>
				)}
				<Grid item className="allC">
					{this.state.books.length !== 0 && (
						<DisplayBooks
							modalDisplay={this.state.modalDisplay}
							books={this.state.books}
							refreshBooks={this.refreshBooks}
						/>
					)}
					{this.state.modalDisplay && (
						<Grid
							className="modal-back"
							item
							onClick={this.changeModal}
							xs={12}
						></Grid>
					)}
					<AddBookModal
						refreshBooks={this.refreshBooks}
						changeModal={this.changeModal}
						modalDisplay={this.state.modalDisplay}
					/>
				</Grid>
			</Grid>
		);
	}
}

export default App;
