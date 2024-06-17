import { NextResponse } from "next/server"
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET( request: any){
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const session_token = user?.id as string
    const { searchParams } = new URL(request.url)

    const searchText = searchParams.get("q")
    const baseURL = process.env.MAPBOX_BASE_URL
    const access_token = process.env.MAPBOX_API_KEY

    const res = await fetch(`${baseURL}?q=${searchText}?language=fi&session_token=${session_token}&country=us&access_token=${access_token}`, 
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

    const searchResult = await res.json()
    console.log(searchResult)
    return NextResponse.json(searchResult)
}