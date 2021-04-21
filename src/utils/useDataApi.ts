/* eslint-disable @typescript-eslint/explicit-module-boundary-types  */
/* eslint-disable  @typescript-eslint/no-explicit-any  */
import { useEffect, useReducer } from 'react'
import { AxiosResponse } from 'axios'

// redux
import { useDispatch } from 'react-redux'
import dataFetchReducer from './dataFetchReducer'

type FetchFuncType = (id?: string) => Promise<AxiosResponse>
type InitialValuesType = Array<string>
type useDataApiType = [{ isLoading: boolean; isError: boolean }]
const useDataApi = (
	fetchFunc: FetchFuncType,
	initialValues: InitialValuesType,
	dispatchFunc: any,
): useDataApiType => {
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
	})
	const reduxDispatch = useDispatch()

	useEffect(() => {
		let didCancel = false

		const fetchData = async () => {
			dispatch({ type: 'FETCH_INIT' })

			try {
				const result = await fetchFunc(...initialValues)
				reduxDispatch(dispatchFunc(result.data))
				if (!didCancel) {
					dispatch({ type: 'FETCH_SUCCESS' })
				}
			} catch {
				if (!didCancel) {
					dispatch({ type: 'FETCH_FAILURE' })
				}
			}
		}

		fetchData()

		return () => {
			didCancel = true
		}
	}, [fetchFunc]) // eslint-disable-line  react-hooks/exhaustive-deps

	return [state]
}

export default useDataApi
