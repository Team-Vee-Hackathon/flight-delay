import {db} from '@/config/firebase';

export async function POST(request){
	const { account } = await request.json();
	// //save to firestore
	await db.collection('insurance').add({
		account,
	})
	return Response.json({msg: account})

}