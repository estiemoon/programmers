import './App.css';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const finalSpaceCharacters = [
  {
    id : 'gary',
    name : 'Gary Goodspeed'
  },
  {
    id : 'cato',
    name : 'Little Cato'
  },
  {
    id : 'kvn',
    name : 'KVN'
  }
]

function App() {
  const[characters, setCharacters] = useState(finalSpaceCharacters);
  const handleEnd = (result) => {
    // result : source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보를 포함
    if (!result.destination) return; // 목적지가 없으면 함수 종료

    //깊은복사?;새로운 data생성 for REACT 불변성
    const items = Array.from(characters);
    //1. (0,1) 배열에서 지우고 (변경시키는 아이템)
    //2. return 값으로 지워진 값을 가져온다
    const [reorderedItem] = items.splice(result.source.index, 1); 
    //3. 원하는 자리에 reorderedItem을 넣는다
    items.splice(result.destination.index, 0, reorderedItem); 
    setCharacters(items);
    
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>

      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId = 'characters'>
          {(provided) => (
            <ul className='characters' 
              {...provided.droppableProps}
              ref = {provided.innerRef}
            >
              {
                characters.map(({id,name},index)=> {
                  return (
                    <Draggable key = {id} draggableId={id} index = {index}>
                      {(provided) => (
                      <li 
                        ref = {provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.dragHandleProps}
                      >
                        <p>
                          {name}
                        </p>
                      </li>                     
                      )}
                    </Draggable>
                  )
                })
              }
              {provided.placeholder}
            </ul>
          )}  
        </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
