import { NextResponse} from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST
( request: Request, {params}: {params: IParams})
{
    const user = await getCurrentUser();
    if(!user){
        return NextResponse.error();
    }

    const { listingId } = params;

    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID");
    }

    let favoriteId = [...(user.favoriteIds || [])];
    favoriteId.push(listingId)

    const saverData = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            favoriteIds: favoriteId
        }
    })


    return NextResponse.json(saverData);
}
export async function DELETE
( request: Request, {params}: {params: IParams}){

    const user = await getCurrentUser();
    if(!user){
        return NextResponse.error();
    }

    const { listingId } = params;

    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID");
    }
    let favoriteIds  = [...(user.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId )
   
    const userUpdate = await prisma.user.update({
        where:{
            id: user.id,
        },
        data:{
            favoriteIds: favoriteIds
        }
    })

    return NextResponse.json(userUpdate);
}
