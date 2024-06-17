import { API_URL, API_KEY } from "@/config/constants";
import axios from "axios";

//Search for flight round trip
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
				fromEntityId: query.sourceId,
				toEntityId: query.destinationId,
				departDate: query.departureDate,
				returnDate: query.returnDate,
				cabinClass: query.classType, //[economy,business,first]
				currency: query.currency,
				adults: query.adults,
				market: query.market,
				locale: query.locale
			}
		})
		return Response.json(res.data);
	} catch (error) {
		console.error(error.response.data.message);
		return Response.json({
			apiErrorMsg: error.response.data.message,
			error: "An error occurred while searching flight round trip"
		});
	}
}