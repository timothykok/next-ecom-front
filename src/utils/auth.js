import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';
export const isLoggedIn = writable(false);

const emptyAuth = {
	token: '',
	userId: ''
};

export function logOut() {
	localStorage.setItem('auth', JSON.stringify(emptyAuth));
	isLoggedIn.set(false);
	goto('users/sign-in/');
	return true;
}

export function getUserId() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['userId'];
	}
	return null;
}

export function getTokenFromLocalStorage() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['token'];
	}
	return null;
}

export async function isValidToken() {
	if (!getTokenFromLocalStorage()) {
		return false;
	}

	try {
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/auth-refresh', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getTokenFromLocalStorage()
			}
		});

		const res = await resp.json();
		if (resp.status == 200) {
			localStorage.setItem(
				'auth',
				JSON.stringify({
					token: res.accessToken,
					refreshToken: res.refreshToken,
					userId: res.record.id
				})
			);
			isLoggedIn.set(true);

			return true;
		}

		return false;
	} catch {
		return false;
	}
}

export async function authenticateUser(email, password) {
	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/auth', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	});

	const res = await resp.json();
	// console.log(res)

	if (resp.status == 200) {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				token: res.accessToken,
				// refreshToken: res.refreshToken,
				// userId: res.record.id
				
			})
			
		);
		isLoggedIn.set(true);

		return {
			success: true,
			res: res
		};
	}

	return {
		success: false,
		res: res
	};
}


