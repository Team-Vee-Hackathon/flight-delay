import supabase from '@/config/supabase';

export async function POST(request){
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
		locale
	} = await request.json();
	//Time to claim
	const claimTime = cabinClass === 'first' ? 24: cabinClass === 'business' ? 12 : 6;
	// //save to firestore
	const {data, error}= await supabase.from('insurance')
	.insert({ account,
		fromEntityId,
		insurancePrice,
		flightPrice,
		toEntityId,
		departDate,
		cabinClass,
		currency,
		adults,
		market,
		claimTime,
		locale}).select()
	if(error) return Response.json({msg: error.message})
	return Response.json(data)

}