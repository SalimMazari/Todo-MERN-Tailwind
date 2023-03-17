import Linkify from 'linkify-react'; //rendre les liens cliquables

export default function Idea({ ideaName, ideaBrand, ideaLink, onClick} ) {
    //State

    //Comportements

    //Affichage (render)
    return (
        <div className="flex justify-between bg-white shadow-md rounded-xl p-3 m-6 max-w-3xl">
            <div className=''>
                <div className='flex items-center'>
                    <p className='font-semibold mr-3'> {ideaName} </p>
                    <p className='pl-3 border-dotted border-l-4 border-violet-300'> {ideaBrand} </p>  
                </div>
                <div>
                    <p className='text-sm italic mt-1 hover:text-violet-600'>
                        <Linkify options={{target:'blank'}}>
                            {ideaLink}
                        </Linkify>
                    </p>
                </div>
            </div>
            <div className='flex items-center'>
                <button
                    className="bg-violet-600 hover:bg-violet-900 text-white px-2 rounded-full"
                    id="delete"
                    onClick={onClick}>
                    x
                </button>
            </div>
        </div>
    );
}