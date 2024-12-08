import { configs } from '../configs.ts'
import Cookies from 'js-cookie'

export class API {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = configs.baseUrlAPI + endpoint
  }

  static headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${API.getToken()}`,
  }

  static setToken(newToken: string) {
    try {
      Cookies.set('token', newToken, { expires: configs.cookieExpiry })
    } catch (error) {
      Cookies.remove('token')
    }
  }

  static getToken(): string {
    try {
      const token = Cookies.get('token')
      if (!token) return ''
      return token
    } catch (error) {
			Cookies.remove('token')
			return ''
    }
  }

  static removeToken() {
    Cookies.remove('token')
  }

  static getHeader() {
    const header = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${API.getToken()}`,
    }
    return header
  }

  async fetch(endpoint: string, options = {}) {
    try {
      const data = await fetch(`${this.endpoint}${endpoint}`, options)
      const json = await data.json()
      return json
    } catch (error) {
      throw error
    }
  }

  async get(endpoint = '') {
    const options = {
      headers: API.getHeader(),
      method: 'GET',
    }
    const result = await this.fetch(endpoint, options)
    return result
  }

  async post(body: Record<string, unknown>, endpoint = '') {
    const options = {
      headers: API.getHeader(),
      method: 'POST',
      body: JSON.stringify(body),
    }
    const result = await this.fetch(endpoint, options)
    return result
  }

  async put(body: Record<string, unknown>, endpoint = '') {
    const options = {
      headers: API.getHeader(),
      method: 'PUT',
      body: JSON.stringify(body),
    }
    const result = await this.fetch(endpoint, options)
    return result
  }

  async delete(body: Record<string, unknown>, endpoint = '') {
    const options = {
      headers: API.getHeader(),
      method: 'DELETE',
      body: JSON.stringify(body),
    }
    const result = await this.fetch(endpoint, options)
    return result
  }
}
