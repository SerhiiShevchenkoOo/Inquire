interface State {
	isLoading: boolean
	isError: boolean
}

type Action =
	| { type: 'FETCH_INIT' }
	| { type: 'FETCH_SUCCESS' }
	| { type: 'FETCH_FAILURE' }

const dataFetchReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'FETCH_INIT':
			return {
				isLoading: true,
				isError: false,
			}
		case 'FETCH_SUCCESS':
			return {
				isLoading: false,
				isError: false,
			}
		case 'FETCH_FAILURE':
			return {
				isLoading: false,
				isError: true,
			}
		default:
			throw new Error('err')
	}
}

export default dataFetchReducer
