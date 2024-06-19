import { API_URL, API_KEY } from "@/config/constants";
import axios from "axios";

//Search for flight details
export async function GET(request) {
	try {
		const query = request.nextUrl.searchParams;
		const res = await axios.get(`${API_URL}/flights/detail`, {
			headers: {
				'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
				"x-rapidapi-key": API_KEY,
				"Content-Type": "application/json"
			},
			params: {
				itineraryId: query.id, //from /flights/search-roundtrip (data->itineraries->id)
				token: query.token, //from /flights/search-roundtrip (data->token)
				currency: query.currency,
				market: query.market,
				locale: query.locale
			}
		})
		return Response.json(res.data);
	} catch (error) {
		console.error(error);
		return Response.json({
			error: "An error occurred while searching flight details"
		});
	}
}