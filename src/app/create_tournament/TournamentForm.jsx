'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function TournamentForm({ session }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [tournament_name, setTournamentName] = useState(null)
  const [tournament_prize,setTournamentPrize] = useState(null)
  const [tournament_level,setTournamentLevel] = useState(null)
  const [club_name,setClubName] = useState(null)
  const user = session?.user
  const club_id = user?.id
  
  

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`club_name`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setClubName(data.club_name)
      }
      
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])
  
  console.log(club_name)

  async function createTournament({ tournament_name, tournament_prize, tournament_level, club_id }) {
    try {
        setLoading(true)
        const { data, error } = await supabase
        .from('tournaments')
        .insert([
        { tournament_name: tournament_name, tournament_prize: tournament_prize, tournament_level: tournament_level,club_id: club_id },
        ])
        .select()
    
    if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error creating tournament!')
    } finally {
      setLoading(false)
    }
  }
    
    

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Club Name</label>
        <input id="club_name" type="text" value={club_name} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Tournament Name</label>
        <input
          id="tournament_name"
          type="text"
          value={tournament_name || ''}
          onChange={(e) => setTournamentName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tournament_prize">Tournament Prize</label>
        <input
          id="tournament_prize"
          type="int"
          value={tournament_prize || ''}
          onChange={(e) => setTournamentPrize(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tournament_level">Tournament Level</label>
        <input
          id="tournament_level"
          type="text"
          value={tournament_level || ''}
          onChange={(e) => setTournamentLevel(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => createTournament({ tournament_name, tournament_prize, tournament_level,club_id})}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}