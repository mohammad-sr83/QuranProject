
type paramsType={params:{id:string}}

export async function GET(response:Response,{params}:paramsType){
    
    const {id} = params
 
    try{
        const res = await fetch(`https://quran.rafed.net/api/get_pack/${id}` )
     
        const data = await res.json()
          return Response.json(data)
    }catch(e){
        return Response.json({error:e}) 
    }
   
}