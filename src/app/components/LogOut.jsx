import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
