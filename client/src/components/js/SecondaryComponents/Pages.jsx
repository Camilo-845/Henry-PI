import React from "react";
import styles from "../../styles/Pages.module.css"
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../redux/actions/index';

const Pages = () => {
    const dispatch = useDispatch()
    const pages = useSelector(state => state.pages)
    const CurrentPage = useSelector(state => state.currentPage)
    var pagesArr = []
    for (let i = 0; i < pages; i++) {
        pagesArr.push({ id: i})
    }
    const HandleClick = (e) => {
        dispatch(actions.setCurrentPage(e.target.value))
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;   
    }
    const HandleNextClick = (e)=>{
        let newPage= parseInt(CurrentPage)+parseInt(e.target.name)
        if(newPage>=0&&newPage<pages){
            dispatch(actions.setCurrentPage(newPage.toString()))
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;   
        }
    }
    return (
        <div className={styles.mainContainer}>
            <button onClick={HandleNextClick} name="-1" className={styles.blockButtonLeft}>{"<"}</button>
            {pagesArr.length > 0 && (pagesArr.map(index => {
                let background;
                if(index.id.toString()===CurrentPage.toString()){
                    background="rgb(117, 143, 165)"
                }else{
                    background="rgb(45,54,62)"
                }
                return (<button
                    className={styles.pageButton}
                    style={{ 'backgroundColor': `${background}` }}
                    id={""+index.isCurrent}
                    onClick={HandleClick}
                    key={index.id}
                    value={index.id}
                >{index.id + 1}</button>
                )
            }))}
            <button onClick={HandleNextClick} name="1" className={styles.blockButtonRight}>{">"}</button>
        </div>
    );
};

export default Pages;