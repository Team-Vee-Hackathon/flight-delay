import { API_URL, API_KEY } from "@/config/constants";
import axios from "axios";
import { calculateInsurancePayout } from "@/utils/functions"

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
				fromEntityId: query.get("fromEntityId"),
				toEntityId: query.get("toEntityId"),
				departDate: query.get("departDate"),
				cabinClass: query.get("cabinClass"), //[economy,business,first]
				currency: query.get("currency") || "GHS",
				adults: query.get("adults") || 1,
				market: query.get("market") || "GH",
				locale: query.get("locale") || "en-GB"

			}
		})
		//calculate insurance
		const flightData = res.data;
		const content = flightData.data.itineraries.map((it) => {
			const insurancePrice = calculateInsurancePayout(it.price.raw, query.get("cabinClass"), query.adults || 1)
			return {
				id: it.id,
				flightPrice: it.price,
				insurancePrice,
				origin: {
					name: it.legs[0].origin.name,
					city: it.legs[0].origin.city,
					country: it.legs[0].origin.country,
				},
				destination: {
					name: it.legs[0].destination.name,
					city: it.legs[0].destination.city,
					country: it.legs[0].destination.country,
				},
				depature: it.legs[0].departure,
				arrival: it.legs[0].arrival,
				airlines: it.legs[0].carriers.marketing,
			}
		})
		return Response.json({
			count: flightData.data.itineraries.length,
			content,
			destinationImage: flightData.data.destinationImageUrl
		});
	} catch (error) {
		console.error(error);
		return Response.json({
			apiErrorMsg: error.response.data.message,
			error: "An error occurred while searching flight one way"
		});
	}
}