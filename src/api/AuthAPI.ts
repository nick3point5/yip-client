import { API } from './API.ts'

export const AuthAPI = new API('/auth')

export async function login(username: string, password: string) {
	const result = await AuthAPI.post({ username, password }, '/login')
	API.setToken(result.token)
	return result
}

export async function signup(username: string, password: string) {
	const result = await AuthAPI.post({ username, password }, '/signup')
	API.setToken(result.token)
	return result
}