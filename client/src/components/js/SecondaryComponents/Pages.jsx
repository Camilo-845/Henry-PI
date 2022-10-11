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
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;   
        dispatch(actions.setCurrentPage(e.target.value))
    }
    return (
        <div className={styles.mainContainer}>
            {pagesArr.length > 0 && (pagesArr.map(index => {
                let background;
                if(index.id===CurrentPage){
                    background="rgb(117, 143, 165)"
                }else{
                    background="rgb(45,54,62)"
                }
                return (<button
                    style={{ 'backgroundColor': `${background}` }}
                    id={""+index.isCurrent}
                    onClick={HandleClick}
                    key={index.id}
                    value={index.id}
                >{index.id + 1}</button>
                )
            }))}
        </div>
    );
};

export default Pages;