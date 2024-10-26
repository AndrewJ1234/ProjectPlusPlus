import Model from 'react-modal'
import Login from './signup/Login'
function Signup(){
    const [visible, setVisible] = useState(false)

    return (
        <>
        <Login/>
            <div>
                <button onClick={()=>setVisible(true)}>Open model</button>
                <Model isOpen={visible} onRequestClose={setVisible(false)} style={{
                    overlay: {
                        background: "black"
                    },
                    content:{
                        width:"500px",
                        height: "500px"
                    }
                }}> 
                    <h1>Model body</h1>
                    <button onClick={()=>setVisible(false)}>Close model</button>
                </Model>
            </div>
        </>
    )
}

export default Signup;