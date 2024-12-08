const production = import.meta.env.VITE_PRODUCTION === 'true'

export const configs = {
  isProd: production,
  baseUrlAPI: production ? import.meta.env.VITE_API_URL : 'http://localhost:8000',
	cookieExpiry: 1,
}
