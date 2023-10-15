import AuthForm from './auth-form'
import Button from '@mui/material/Button';



export default function Home() {
  return (
    <div className="row">
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </div>
  )
}

