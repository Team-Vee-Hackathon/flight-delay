

export function GET(request) {
	console.log(request.nextUrl.searchParams.get("search"))
return Response .json({msg: "query"})
}
