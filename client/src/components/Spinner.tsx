import { ClipLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-8">
        <ClipLoader color='#4F46E5' size={36}/>
    </div>
  )
}

export default Spinner