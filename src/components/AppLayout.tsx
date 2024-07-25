import Header from './Header'
import InputForm from './InputForm'
import NoteSpace from './NoteSpace'

const Applayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className='h-full w-full'>
        <InputForm />
        <NoteSpace />
      </main>
    </>
  )
}

export default Applayout
