import React from 'react'
import './Styles/ListItem.scss'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function ListItem() {
    return (
        <div className='listItem'>
            <img src="https://wallpaperboat.com/wp-content/uploads/2021/12/19/79926/spider-man-no-way-home-12.jpg" alt="" />
            <div className="itemInfo">
                <div className="icons">
                    <PlayCircleFilledWhiteOutlinedIcon/>
                    <AddOutlinedIcon/>
                    <ThumbUpIcon/>
                    <ThumbDownIcon/>
                </div>
                <itemInfoTop>
                    <span>1 Hour 14 minutes</span>
                    <span className='limit'>18+</span>
                    <span>2021</span>
                </itemInfoTop>
                <div className="desc">
                With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer able to separate his normal life as Peter Parker from the high stakes of being a superhero. When Peter asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.
                </div>
                <div className="genre">Action</div>
            </div>
        </div>
    )
}

export default ListItem
