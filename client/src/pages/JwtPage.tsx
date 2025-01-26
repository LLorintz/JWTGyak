import { JwtHandler } from '../JWThandler'
import { ApiHandler } from '../ApiHandler'
import { LoginForm } from '../LoginForm'

const JwtPage = () => {
  return (
        <>
        <JwtHandler></JwtHandler>
        <ApiHandler></ApiHandler>
        <LoginForm></LoginForm>
        </>
  )
}

export default JwtPage