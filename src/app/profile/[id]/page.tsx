export default function UserProfile ({params} : any){
    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen ">
            <h1 className="text-4xl ">profile </h1>
            <h2 className="text-3xl"> userId : {params.id}</h2>
        </div>
    )
}