import "../App.css";

const Todo = () : JSX.Element => {
    return (
    <div className="todo-container">
        <h1 className ="todo-container_header">PEON TODO</h1>
        <form className ="todo-container_form">
            <input type="text" className="todo-container_input" placeholder="할 일 입력" required/>
            <button type="submit" className="todo-container_button">
            할 일 추가
            </button>
        </form>
        <div className="render-container">
            <div className="render-container_section">
                <h2 className="render-container_title">할 일</h2>
                <ul id="todo_list" className="render-container_list">
                    <li className ="render-container_item">할 일 1</li>



                </ul>
        
        </div>
        <div className="render-container">
            <div className="render-container_section">
                <h2 className="render-container_title">완료</h2>
             </div>           
            </div>
        </div>
    </div>
    );
};

export default Todo;