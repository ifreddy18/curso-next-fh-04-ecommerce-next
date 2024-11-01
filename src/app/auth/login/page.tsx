import { titleFont } from '@/config/fonts'
import { LoginForm } from './ui/LoginForm'

export default function LoginPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<h1 className={`${titleFont.className} mb-5 text-4xl`}>Sign in</h1>
			<LoginForm />
		</div>
	)
}
