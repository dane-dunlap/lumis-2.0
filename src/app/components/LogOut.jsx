
'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button";

function LogoutButton() {
  // instantiate supabase client
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error during sign out:', error);
      // You can show some feedback to the user here if needed.
    } else {
      console.log('User signed out successfully.');
      // Redirect to home page or show some feedback to the user.
    }
  };

  return (
    <div>
    <Button onClick={handleLogout}>Logout</Button>
    </div>

  );
}

export default LogoutButton;
