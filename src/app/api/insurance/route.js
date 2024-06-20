import supabase from '@/config/supabase';

export async function POST(request) {
	const requestBody = await request.json();
	const { account,
		fromEntityId,
		toEntityId,
		departDate,
		cabinClass, //[economy,business,first]
		currency,
		adults,
		market,
		insurancePrice,
		flightPrice,
		locale,timeTaken
	} = requestBody;
	// Time to claim
	const claimTime = cabinClass === 'first' ? 24 : cabinClass === 'business' ? 12 : 6;

	//
	const flightId = Math.random().toString(36).substring(7);
	// Save to Firestore
	const { data, error } = await supabase.from('insurance')
		.insert({
			account,
			flightId,
			fromEntityId,
			insurancePrice,
			flightPrice,
			toEntityId,
			departDate,
			cabinClass,
			timeTaken,
			currency: currency || "GHS",
			adults,
			market: market || "GH",
			active: true,
			claimTime,
			locale: locale || "en-GB"
		}).select();

	if (error) {
		return Response.json(error.message);
	}

	return Response.json(data);
}
