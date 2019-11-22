import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { IconButton, Fab, MenuItem, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { IAppState } from '../redux/reducers/rootReducer';
import {
	editMethod,
	addMethod,
	deleteMethod,
	newMethod,
} from '../redux/actions/actions';
import {
	IMethodState,
	IMethodActionTypes,
	IMethod,
	IMethodProperty,
	INewMethod,
} from '../interfaces/interfaces';
import { getMethods, getAllMethods } from '../redux/selectors/methodSelectors';
import { getCalls } from '../redux/selectors/callSelectors';
import getSettingsStage from '../redux/selectors/settingSelectors';
import useStyles from '../styles/styles';
import { isValidMethodNotation } from '../helpers/methodHelper';
import MethodDialog from './MethodDialog';

const Methods = (props: IMethodState) => {
	const styles = useStyles();
	const [open, setOpen] = React.useState(false);

	const getCallDropdownValues = (searchString: string) => {
		const filteredCalls = props.calls.filter(
			call =>
				call.name.includes(searchString) || call.name.includes('User'),
		);

		return filteredCalls.map(call => (
			<MenuItem key={call.abbreviation} value={call.abbreviation}>
				{call.name}
			</MenuItem>
		));
	};

	const handleChange = (property: IMethodProperty, method: IMethod) => (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		method[property] = String(event.target.value);
		props.editMethod(method);
	};

	const fieldValidation = (method: IMethod, property: IMethodProperty) => {
		let validation: string = '';

		if (!method[property]) {
			validation = 'Enter a value';
		} else {
			switch (property) {
				case 'abbreviation':
					const dupe = props.allMethods.filter(methodToCheck => {
						return (
							methodToCheck.abbreviation ===
							method.abbreviation &&
							(methodToCheck.stage !== method.stage || methodToCheck.id < method.id)
						);
					}).length;

					dupe > 0 && (validation = 'Use unique abbreviations');
					break;
				case 'placeNotation':
					const validNotation = isValidMethodNotation(method.stage, method.placeNotation)

					!validNotation && (validation = 'Invalid place notation')
					break;
			}
		}

		return validation;
	};

	const getMethodField = (
		method: IMethod,
		property: IMethodProperty,
		label: string,
	) => {
		const validation = fieldValidation(method, property);
		const error = validation ? true : false;

		return (
			<TextField
				id={`outlined-method-${property.toString()}`}
				error={error}
				helperText={validation}
				label={label}
				value={method[property]}
				margin="normal"
				onChange={handleChange(property, method)}
				fullWidth
			/>
		);
	};

	const getMethodRows = () => {
		return props.methods.map(method => {
			return (
				<Grid key={method.id} container spacing={2}>
					<Grid item xs={12} sm={8} lg={2}>
						{getMethodField(method, 'name', 'Name')}
					</Grid>
					<Grid item xs={12} sm={4} lg={1}>
						{getMethodField(method, 'abbreviation', 'Abbreviation')}
					</Grid>
					<Grid item xs={12} sm={12} lg={4}>
						{getMethodField(
							method,
							'placeNotation',
							'Place Notation',
						)}
					</Grid>
					<Grid item xs={12} sm={5} lg={2}>
						<TextField
							select
							id="method-defaultbob-dropdown"
							className={styles.methodCallDropdown}
							label="Default Bob"
							value={method.defaultBob}
							onChange={handleChange('defaultBob', method)}
							margin="normal"
							variant="outlined"
						>
							{getCallDropdownValues('Bob')}
						</TextField>
					</Grid>
					<Grid item xs={8} sm={5} lg={2}>
						<TextField
							select
							id="method-defaultsingle-dropdown"
							className={styles.methodCallDropdown}
							label="Default Single"
							value={method.defaultSingle}
							onChange={handleChange('defaultSingle', method)}
							margin="normal"
							variant="outlined"
						>
							{getCallDropdownValues('Single')}
						</TextField>
					</Grid>
					<Grid item xs={4} sm={2} lg={1}>
						<IconButton
							onClick={() => props.deleteMethod(method.id)}
							className={styles.methodDelete}
						>
							<DeleteIcon />
						</IconButton>
					</Grid>
					<Grid item xs={12}>
						<Divider variant="middle" />
					</Grid>
				</Grid>
			);
		});
	};

	return (
		<div className={styles.methodList}>
			{getMethodRows()}
			<Fab
				variant="extended"
				color="primary"
				onClick={() => setOpen(true)}
				className={styles.buttonLeft}
			>
				<AddIcon />
				Lookup Method
			</Fab>
			<Fab
				variant="extended"
				color="primary"
				onClick={() => props.newMethod(props.stage)}
				className={styles.buttonRight}
			>
				<AddIcon />
				Create Method
			</Fab>
			<MethodDialog
				open={open}
				stage={props.stage}
				onClose={() => setOpen(false)}
			/>
		</div>
	);
};

const mapStateToProps = (state: IAppState) => {
	const allMethods = getAllMethods(state);
	const methods = getMethods(state);
	const calls = getCalls(state);
	const stage = getSettingsStage(state);
	return { allMethods, methods, calls, stage };
};

const mapDispatchToProps = (dispatch: Dispatch<IMethodActionTypes>) => {
	return {
		newMethod: (stage: number) => dispatch(newMethod(stage)),
		addMethod: (method: INewMethod) => dispatch(addMethod(method)),
		editMethod: (method: IMethod) => dispatch(editMethod(method)),
		deleteMethod: (id: number) => dispatch(deleteMethod(id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Methods);
