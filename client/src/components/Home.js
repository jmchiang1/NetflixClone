import './Styles/Home.scss'
import Navbar from './Navbar'
import Feature from './Featured'
import List from './List'

function Home() {
    return (
        <div className="home">
            <Navbar/>
            <Feature type="movie"/>
            <List/>
            <List/>
            <List/>
            
        </div>
    )
}

export default Home
