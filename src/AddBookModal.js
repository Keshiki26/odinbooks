import {
	Button,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleButton from '@material-ui/lab/ToggleButton';

class addBookModal extends React.Component {
	state = {
		title: '',
		author: '',
		pages: 0,
		read: false,
		errorT: '',
		errorA: '',
		errorP: '',
	};

	render() {
		return (
			this.props.modalDisplay && (
				<Grid
					item
					container
					className="modal-cont"
					justify="center"
					alignItems="center"
				>
					<Grid
						item
						xs={10}
						md={7}
						className="modal-content"
						container
						direction="column"
						justify="center"
						alignItems="center"
					>
						<IconButton className="modal-x" onClick={this.props.changeModal}>
							<CloseIcon
								color="inherit"
								fontSize="large"
								className="exit-button"
							></CloseIcon>
						</IconButton>
						<Typography>Add New Book</Typography>
						<Grid item xs={12} className="form-add">
							<form
								noValidate
								autoComplete="off"
								onSubmit={(e) => {
									e.preventDefault();
									const { pages, title, author, read } = this.state;
									if (title === '') {
										this.setState({ errorT: 'Please enter a title' });
									}
									if (author === '') {
										this.setState({ errorA: 'Please enter an author' });
									}
									if (pages <= 0) {
										this.setState({
											errorP: 'Number must be greater than 0',
										});
									}
									if (!(title === '') && !(author === '') && !(pages <= 0)) {
										const book = [{ pages, title, author, read }];

										if (localStorage.getItem('books') === null) {
											localStorage.setItem('books', JSON.stringify(book));
										} else {
											const newBooks = book.concat(
												JSON.parse(localStorage.getItem('books'))
											);
											localStorage.setItem('books', JSON.stringify(newBooks));
										}
										this.props.refreshBooks();
										this.props.changeModal();
										this.setState({
											title: '',
											author: '',
											pages: 0,
											read: false,
										});
									}
								}}
							>
								<Grid
									container
									justify="center"
									className="inputs-cont"
									alignItems="center"
								>
									<TextField
										label="Title"
										className="input-form-add"
										variant="filled"
										color="secondary"
										error={this.state.errorT === '' ? false : true}
										value={this.state.title}
										helperText={this.state.errorT}
										onChange={(e) => {
											this.setState({ errorT: '' });
											this.setState({ title: e.target.value });
										}}
									></TextField>
									<TextField
										label="Author"
										className="input-form-add"
										variant="filled"
										helperText={this.state.errorA}
										color="secondary"
										error={this.state.errorA === '' ? false : true}
										value={this.state.author}
										onChange={(e) => {
											this.setState({ errorA: '' });
											this.setState({ author: e.target.value });
										}}
									></TextField>
									<TextField
										label="Pages"
										className="input-form-add"
										variant="filled"
										error={this.state.errorP === '' ? false : true}
										helperText={this.state.errorP}
										value={this.state.pages}
										onChange={(e) => {
											if (!isNaN(e.target.value)) {
												this.setState({ errorP: '' });
												this.setState({ pages: e.target.value });
											} else {
												this.setState({ errorP: 'Please enter a number' });
											}
										}}
										color="secondary"
									></TextField>
									{this.state.read && (
										<ToggleButton
											onClick={() => this.setState({ read: false })}
										>
											Read
											<ToggleOnIcon color="secondary" fontSize="large" />
										</ToggleButton>
									)}
									{!this.state.read && (
										<ToggleButton onClick={() => this.setState({ read: true })}>
											Not Read
											<ToggleOffIcon fontSize="large" />
										</ToggleButton>
									)}
								</Grid>
								<Grid container justify="center" className="add-button-cont">
									<Button
										type="submit"
										variant="outlined"
										className="add-button"
									>
										ADD
									</Button>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Grid>
			)
		);
	}
}
export default addBookModal;
