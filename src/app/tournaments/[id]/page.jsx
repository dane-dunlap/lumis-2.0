
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
    const id = params.id;
    console.log(id)

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

  return (
    
    <div>
        <TournamentCard tournament={tournament} />
    </div>
  );
}