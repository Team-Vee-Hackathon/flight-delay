import firbase from "@/config/firebase"

export function GET(request){
	//get barer token
	// const token =request.headers.get("Authorization").split(" ")[1]
// check user 
	
	
	//check if token is valid
	return Response.json({msg: token})
}