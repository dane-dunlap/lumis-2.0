'use client'
import { useEffect, useState } from 'react';
import TournamentCard from '../components/TournamentCard';  // Ensure path is correct
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; 
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  async function get_tournaments() {
    try {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*');
      if (error) throw error;  // Ensure error is thrown if fetch fails
      setTournaments(data);    // Update state with fetched data
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  }

  useEffect(() => {
    get_tournaments();
  }, []);

  return (
    <div>
     
      {tournaments.map((tournament, index) => (
      <Link href={`/tournaments/${tournament.id}`} key={index}>
        <TournamentCard key={index} tournament={tournament} />
        </Link>
      ))}
    </div>
  );
}
