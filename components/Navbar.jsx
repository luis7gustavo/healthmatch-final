import Link from 'next/link';
export default function Navbar(){
  return (
    <header className="py-4 border-b border-gray-800 mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-2">
        <Link href='/'><span className="header-brand text-2xl">HealthMatch</span></Link>
        <nav className="flex gap-4 items-center">
          <Link href='/' className="text-sm">Home</Link>
          <Link href='/dashboard' className="text-sm">Dashboard</Link>
          <a className="btn-primary text-sm">Entrar</a>
        </nav>
      </div>
    </header>
  )
}
