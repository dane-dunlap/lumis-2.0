
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import TournamentCard from '../../components/TournamentCard';  // Ensure path is correct




export default function Tournament() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; 
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const params = useParams();
    const [tournament, setTournament] = useState([]);
    const [club, setClub] = useState([]);
    const id = params.id;

  async function get_tournament() {
    try {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;  // Ensure error is thrown if fetch fails
      console.log("Data Received:", data);  // Add this line
      setTournament(data);    // Update state with fetched data
    } catch (error) {
      console.error('Error fetching tournament:', error);
    }
  }

  useEffect(() => {
    get_tournament();
  }, [id]);
  console.log(tournament.id)

  async function get_club(tournamentId) {
    try {
        const { data, error } = await supabase
            .from('tournaments')
            .select(`profiles:club_id (club_name,club_mobile_number,club_address)`)
            .eq('id', tournamentId)
            .single();
            
        if (error) throw error;  
        console.log("Club Data Received:", data);
        setClub(data.profiles);   
    } catch (error) {
        console.error('Error fetching club:', error);
    }
}

useEffect(() => {
    get_tournament();
}, [id]);

useEffect(() => {
    if(tournament.id) {
        get_club(tournament.id);
    }
}, [tournament]);

console.log(club)

return (
    <div>
        <TournamentCard tournament={tournament} />
        <h1>About the club</h1>
        <p>Club name: {club?.club_name}</p>
        <p>Club mobile number: {club?.club_mobile_number}</p>
        <p>Club address: {club?.club_address}</p>

    </div>
);
}





