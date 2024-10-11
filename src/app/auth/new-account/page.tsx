import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Sign up</h1>

      <RegisterForm />
    </div>
  );
}