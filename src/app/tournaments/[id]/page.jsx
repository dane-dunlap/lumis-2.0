'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import TournamentCard from '../../components/TournamentCard';

export default function Tournament() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; 
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const params = useParams();
    const [tournament, setTournament] = useState(null);
    const id = params.id;

    async function get_tournament() {
        try {
            const { data, error } = await supabase
                .from('tournaments')
                .select(`*,profiles:club_id (club_name, club_mobile_number, club_address)`)
                .eq('id', id)
                .single();
            if (error) throw error;
            setTournament(data);
        } catch (error) {
            console.error('Error fetching tournament:', error);
        }
    }

    useEffect(() => {
        get_tournament();
    }, [id]);

    return (
        <div>
            {tournament && <TournamentCard tournament={tournament} />}
            <h1>About the club</h1>
            {tournament?.profiles && (
                <>
                    <p>Club name: {tournament.profiles.club_name}</p>
                    <p>Club mobile number: {tournament.profiles.club_mobile_number}</p>
                    <p>Club address: {tournament.profiles.club_address}</p>
                </>
            )}
        </div>
    );
}
