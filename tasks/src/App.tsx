import { useState } from 'react'
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from './App.css'
import BoardList from './components/BoardList/BoardList'
import ListsContainer from './components/ListsContainer/ListsContainer';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import EditModal from './components/EditModal/EditModal';
import LoggerModal from './components/LoggerModal/LoggerModal';
import { deleteBoard } from './store/slices/boardsSlice';
import { addLog } from './store/slices/loggerSlice';
import { v4 } from 'uuid';

 
function App() {
  const dispatch = useTypedDispatch();

  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  
  const modalActive = useTypedSelector(state => state.boards.modalActive)
  const boards = useTypedSelector(state => state.boards.boardArray);

  //activeboard의 list container를 보여주기
  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0];
  const lists = getActiveBoard.lists;

  const handleDeleteBoard = () => {
    if(boards.length > 1) {
      dispatch(
        deleteBoard({boardId : getActiveBoard.boardId})
      )
      dispatch(
        addLog({
          logId : v4(),
          logMessage : `게시판 지우기 : ${getActiveBoard.boardName}`,
          logAuthor : 'Moon',
          logTimestamp : String(Date.now())
        })
      )

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          board => board.boardId === activeBoardId
        )

        return indexToBeDeleted === 0 
        ? indexToBeDeleted + 1
        : indexToBeDeleted - 1
      }
      setActiveBoardId(boards[newIndexToSet()].boardId)


    } else {
      alert('최소 한 개의 게시판은 있어야 합니다.')
    }
  }

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen = {setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal  /> : null}

      <BoardList 
        activeBoardId = {activeBoardId} 
        setActiveBoardId = {setActiveBoardId} />
      <div className={board}>
        <ListsContainer lists = {lists} boardId = {getActiveBoard.boardId}> 

        </ListsContainer>

      </div>
      <div  className={buttons}>
        <button
          className= {deleteBoardButton} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button
          className= {loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? '활동 목록 숨기기' : '활동 목록 보기'}
        </button>
      </div>
    </div>
  )
}

export default App
