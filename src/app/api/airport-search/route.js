import { API_URL, API_KEY } from "@/config/constants";
import axios from "axios";

//Autocomplete search for airports
export async function GET(request) {
	try {
		const query = request.nextUrl.searchParams.get("search");
		const res = await axios.get(`${API_URL}/flights/auto-complete`, {
			headers: {
				'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
				"x-rapidapi-key": API_KEY,
				"Content-Type": "application/json"
			},
			params: {
				query,
			}
		})
		const content = res.data.data.map((a) => {
			return {
				...a.presentation,
			}
		})
		return Response.json({
			count: content.length,
			content
		});
	} catch (error) {
		console.error(error);
		return Response.json({
			error: "An error occurred while searching for airports."
		});
	}
}