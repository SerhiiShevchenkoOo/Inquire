/* eslint  camelcase: 0 */
import axios, { AxiosResponse } from 'axios'

const API_URl = 'https://bloggy-api.herokuapp.com'

export const getAllposts = async (): Promise<AxiosResponse> => {
	const url = `${API_URl}/posts`
	try {
		const posts = await axios.get(url)
		return posts
	} catch (err) {
		throw new Error(err)
	}
}
export const getPost = async (id: string): Promise<AxiosResponse> => {
	const url = `${API_URl}/posts/${id}`
	try {
		const posts = await axios.get(url)
		return posts
	} catch (err) {
		throw new Error(err)
	}
}

export const createPost = async (title: string, body: string) => {
	const url = `${API_URl}/posts`
	try {
		const result = await axios.post(url, { title, body })
		return result
	} catch (err) {
		throw new Error(err)
	}
}
export const updatePost = async (
	title: string,
	body: string,
	id: string | number,
): Promise<void> => {
	const url = `${API_URl}/posts/${id}`
	try {
		await axios.put(url, {
			title,
			body,
		})
	} catch (err) {
		throw new Error(err)
	}
}
export const delatePost = async (id: number): Promise<void> => {
	const url = `${API_URl}/posts/${id}`
	try {
		await axios.delete(url)
	} catch (err) {
		throw new Error(err)
	}
}

export const createComment = async (
	id: number,
	body: string,
): Promise<AxiosResponse> => {
	const url = `${API_URl}/comments/`
	try {
		const data = await axios.post(url, {
			createPost: id,
			body,
		})
		return data
	} catch (err) {
		throw new Error(err)
	}
}
