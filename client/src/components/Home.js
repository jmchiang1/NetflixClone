import './Styles/Home.scss'
import Navbar from './Navbar'
import Feature from './Featured'
import List from './List'

function Home({type}) {
    return (
        <div className="home">
            <Navbar/>
            <Feature type={type} />
            <List/> 
            <List/>
            <List/>
            
        </div>
    )
}

export default Home
