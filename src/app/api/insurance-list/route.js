import firbase from "@/config/firebase"

export function GET(request){
	//get barer token
	// const token =request.headers.get("Authorization").split(" ")[1]
// check user 
	firbase.firestore().collection('insurance').where('account','==',account).get().then((snapshot)=>{
		if(snapshot.empty){
			return Response.json({msg: 'No data found'})
		}
		let data = []
		snapshot.forEach((doc)=>{
			data.push(doc.data())
		})
		return Response.json({data})
	}
	)
}