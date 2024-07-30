const Header: React.FC = () => {
  return (
    <header className='flex h-16 w-full items-center justify-between'>
      <img src='/logo.png' alt='' className='max-w-[40px]' />
      <nav className='flex items-center justify-center'>
        <h1 className='text-xl font-bold'>Habify - Recent notes (Khoi)</h1>
      </nav>
      <div></div>
    </header>
  )
}

export default Header
