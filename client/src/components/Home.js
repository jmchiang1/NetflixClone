import './Styles/Home.scss'
import Navbar from './Navbar'
import Feature from './Featured'

function Home() {
    return (
        <div className="home">
            <Navbar/>
            <Feature type="movie"/>
        </div>
    )
}

export default Home
