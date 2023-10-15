
'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'




export default function AccountForm({ session }) {
    const supabase = createClientComponentClient()
    const user = session?.user
    console.log(user)

  return (
    
    <div>
        <h1>hello</h1>
    </div>
  );
}