import React, { useEffect, useRef } from "react";
import { Map } from "immutable";


export function clearToken() {
	localStorage.removeItem("auth_token");
}

export function getToken() {
	try {
		const authToken = localStorage.getItem("auth_token");
		return new Map({ authToken });
	} catch (err) {
		clearToken();
		return new Map();
	}
}

export function formatValidation(data = {}) {
	return Object.keys(data).map((key, okey) => {
		return (
			<span key={okey}>
				<b>{key}</b>
				<ul>
					{
						data[key].map((single, skey) => {
							return (<li key={skey}>{single}</li>)
						})
					}
				</ul>
			</span>
		);
	});
}
