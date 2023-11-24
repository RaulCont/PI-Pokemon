import {Link} from 'react-router-dom'

export const Home = () => {
  return (
    <div>Home
        <Link to={`/card`}>
            <h2>A Cards</h2>                  
        </Link>
    </div>
  )
}
