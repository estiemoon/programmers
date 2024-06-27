import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
    modalActive : boolean;
    boardArray : IBoard[]
}
type TAddBoardAction = {
    board : IBoard
}
type TDeleteListAction = {
    boardId : string;
    listId : string;
}
type TAddListAction = {
    boardId : string;
    list : IList;
}
type TAddTaskAction = {
    boardId : string;
    listId : string;
    task : ITask;
}
type TDeleteTaskAction = {
    boardId : string;
    listId : string;
    taskId : string;
}
type TDeleteBoardAction = {
    boardId : string;

}
type TSortAction = {
    boardIndex : number;
    droppableIdStart : string;
    droppableIdEnd : string;
    dropableIndexStart : number;
    dropableIndexEnd : number;
    draggableId : string;
}
const initialState : TBoardsState = {
    modalActive : false,
    boardArray : [
        {
            boardId : 'board-0',
            boardName : "first 게시물",
            lists : [
                {
                    listId : "list-0",
                    listName : "list 1",
                    tasks : [
                        {
                            taskId : "task-0",
                            taskName : 'Task 1',
                            taskDescription : "Description",
                            taskOwner : "Moon"
                        },
                        {
                            taskId : "task-1",
                            taskName : 'Task 2',
                            taskDescription : "Description",
                            taskOwner : "Moon"
                        }
                    ]  
                },
                {
                    listId : "list-1",
                    listName : "list 2",
                    tasks : [
                        {
                            taskId : "task-3",
                            taskName : 'Task 3',
                            taskDescription : "Description",
                            taskOwner : "Moon"
                        }
                    ]  
                }
            ]
        }
    ]
}



const boardsSlice = createSlice({
    name : "boards",
    initialState,
    reducers : {
        addBoard : (state, {payload} : PayloadAction<TAddBoardAction>) => {
            state.boardArray.push(payload.board);
        },
        deleteBoard : (state, {payload} : PayloadAction<TDeleteBoardAction>) => {
            state.boardArray = state.boardArray.filter(board =>
                board.boardId !== payload.boardId
            )
        }
        ,
        addList : (state, {payload} : PayloadAction<TAddListAction>) => {
            state.boardArray.map(board =>
                board.boardId === payload.boardId
                ? {...board, lists : board.lists.push(payload.list)}
                : board
            )
        }
        ,
        addTask :  (state, {payload} : PayloadAction<TAddTaskAction>) => {
            state.boardArray.map(board => 
                board.boardId === payload.boardId
                ? {
                    ...board,
                    lists: board.lists.map(list => 
                        list.listId === payload.listId
                        ? {
                            ...list,
                            tasks: list.tasks.push(payload.task)
                        }
                        : list
                    )
                }
                : board
            )
        }
        ,
        deleteList : (state, {payload} : PayloadAction<TDeleteListAction>) => {
            state.boardArray = state.boardArray.map(
                board => 
                    board.boardId === payload.boardId
                    ?
                    {
                        ...board,
                        lists : board.lists.filter(
                            list => list.listId !== payload.listId
                        )
                    }
                    :
                    board
            )
        },
        setModalActive : (state,{payload}:PayloadAction<boolean>) => {
            state.modalActive = payload;
        },
        updateTask: (state, {payload} : PayloadAction<TAddTaskAction>) => {
            state.boardArray = state.boardArray.map(
                board => board.boardId === payload.boardId
                ? {
                    ...board,
                    lists : board.lists.map(list => 
                        list.listId === payload.listId
                        ? {
                            ...list,
                            tasks : list.tasks.map(task =>
                                task.taskId === payload.task.taskId
                                ? payload.task
                                : task
                            )
                        }
                        : list
                    )
                }
                : board
            )

        },
        deleteTask : (state, {payload} : PayloadAction<TDeleteTaskAction>) => {
            state.boardArray = state.boardArray.map(board => 
                board.boardId === payload.boardId
                ? {
                    ...board,
                    lists : board.lists.map(list=>
                        list.listId === payload.listId
                        ? {
                            ...list,
                            tasks : list.tasks.filter(
                                task => task.taskId !== payload.taskId
                            )
                        }
                        : list
                    )
                }
                : board
            )
        },

        sort : (state,{payload}:PayloadAction<TSortAction>) => {
            // 같은 리스트
            if(payload.droppableIdStart === payload.droppableIdEnd) {
                const list = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdStart
                )
                // 변경시킨 아이템을 배열에서 지운 후 return으로 값을 뽑아
                const card = list?.tasks.splice(payload.dropableIndexStart, 1);
                list?.tasks.splice(payload.dropableIndexEnd, 0, ...card!) //...card! type 단언?
            }
            // 다른 리스트
            if(payload.droppableIdStart !== payload.droppableIdEnd){
                const listStart = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdStart
                )
                const card = listStart?.tasks.splice(payload.dropableIndexStart,1);
                const listEnd = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdEnd
                )
                listEnd?.tasks.splice(payload.dropableIndexEnd,0, ...card!);
            }
            
        }

        


    }
})

export const boardsReducer= boardsSlice.reducer; //sub reducer => combine해줄 것

export const {
    addBoard,deleteList,setModalActive,
    addList,addTask,updateTask,deleteTask
    ,deleteBoard,sort} = boardsSlice.actions; //action creator