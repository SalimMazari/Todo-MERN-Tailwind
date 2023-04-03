import Linkify from 'linkify-react'; //rendre les liens cliquables

const Idea = ({ ideaName, ideaBrand, ideaLink, onClick}) => {
    //State

    //Comportements

    //Affichage (render)
    return (
    <div className="flex justify-between bg-white shadow-md rounded-xl p-3 m-6">

        {/* IDEE */}
        <div className=''>

            {/* NOM + MARQUE */}
            <div className='flex items-center'>
                <p className='font-semibold mr-3'> {ideaName} </p>
                <p className='pl-3 border-dotted border-l-4 border-violet-300'> {ideaBrand} </p>  
            </div>

            {/* LIEN */}
            <div>
                <p className='text-sm italic mt-1 hover:text-violet-600'>
                    <Linkify options={{target:'blank'}}>
                        {ideaLink}
                    </Linkify>
                </p>
            </div>

        </div>

        {/* BOUTON SUPPRIMER */}
        <div className='flex items-center'>
            <button onClick={onClick} className="bg-violet-600 hover:bg-violet-900 text-white p-1 ml-6 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="white" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
            </button>
        </div>

    </div>
    );
}   

export default Idea;