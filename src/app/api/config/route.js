import { CONFIGS } from "@/config/constants";

export function GET(){
	return Response.json({
		data: CONFIGS
	})
}