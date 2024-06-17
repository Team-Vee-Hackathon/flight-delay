import { API_URL, API_KEY } from "@/config/constants";
import axios from "axios";

//Ssearch for flight oneway
export async function GET(request) {
	try {
		const query = request.nextUrl.searchParams;
		const res = await axios.get(`${API_URL}/flights/search-one-way`, {
			headers: {
				'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
				"x-rapidapi-key": API_KEY,
				"Content-Type": "application/json"
			},
			params: {
				fromEntityId: query.fromEntityId,
				toEntityId: query.toEntityId,
				departDate: query.departDate,
				cabinClass: query.cabinClass, //[economy,business,first]
				currency: query.currency,
				adults: query.adults || 1,
				market: query.market || "GH",
				locale: query.locale

			}
		})
		return Response.json(res.data);
	} catch (error) {
		console.error(error.response.data.message);
		return Response.json({
			apiErrorMsg: error.response.data.message,
			error: "An error occurred while searching flight one way"
		});
	}
}