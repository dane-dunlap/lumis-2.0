



export default function TournamentCard({ tournament }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white my-4 p-4">
      <img className="w-full h-48 object-cover mb-4" src={tournament.tournament_image} alt="Tournament" />
      <h2 className="font-bold text-xl mb-2 text-gray-700">Tournament on {tournament.tournament_date}</h2>
      <span className="text-white bg-gray-400 rounded-full py-1 px-3 mb-2 inline-block">
        Level: {tournament.tournament_level}
      </span>
      <div className="mt-2">
        <span className="text-white bg-gray-400 rounded-full py-1 px-3 inline-block">
          Prize: ${tournament.tournament_prize}
        </span>
      </div>
    </div>
  );
}

