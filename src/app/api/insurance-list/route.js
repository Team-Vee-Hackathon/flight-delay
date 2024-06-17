export function GET(request){
	//get barer token
	const token = request.headers.get("Authorization")

	//check if token is valid
	return Response.json({msg: token})
}