'use client'
import { useEffect, useState } from 'react';
import TournamentCard from '../components/TournamentCard';  // Ensure path is correct
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link'
import LogoutButton from '../components/LogOut';
import { Button } from "@/components/ui/button"



const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; 
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [levelFilter, setLevelFilter] = useState("");


  async function get_tournaments(level) {
    try {
        let query = supabase.from('tournaments').select(`*,profiles:club_id (club_name)`);
        if (level) query = query.eq('tournament_level', level);
        const { data, error } = await query;
        if (error) throw error;
        setTournaments(data);
    } catch (error) {
        console.error('Error fetching tournaments:', error);
    }
}

useEffect(() => {
    get_tournaments(levelFilter);
}, [levelFilter]);

  return (
    
    
    <div>
      <LogoutButton />
     <div>
    <label htmlFor="levelFilter">Level: </label>
    <select 
        name="levelFilter" 
        value={levelFilter}
        onChange={(e) => setLevelFilter(e.target.value)}
    >
        <option value="">All</option>
        <option value="C">C</option>
        <option value="C+">C+</option>
        <option value="Open C">Open C</option>
        {/* Additional options as needed */}
    </select>
    </div>

      {tournaments.map((tournament, index) => (
      <Link href={`/tournaments/${tournament.id}`} key={index}>
        
        <TournamentCard key={index} tournament={tournament} />
        <Button>Click me</Button>

        

        </Link>
      ))}
    </div>
  );
}
