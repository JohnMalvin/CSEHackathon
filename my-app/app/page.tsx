"use client";

import { useState } from "react";
import React from "react";

export default function MainPage() {
	const [search, setSearch] = useState('');

	function doSearch() {
		//doSearch
	}
	
	return (
		<div className="flex">
			<div className="absolute right-2 top-3">
				<form className="pr-3">
					<input value={search} onChange={e => setSearch(e.target.value)}/>
					<button onClick={doSearch} className="">Search</button>
				</form>
			</div>
		</div>
	);
}
