import supabase from '@/config/supabase';

export async function GET(request) {
	const query = request.nextUrl.searchParams;
	const { data, error } = await supabase.from('insurance').select().eq('account', query.get("account"))
	if (error) return Response.json({ msg: error.message })
	return Response.json(data)
}