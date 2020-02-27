import React,{Component} from 'react';
import './index.css'

class Todo extends Component{
    /**
     * 这是因为子类没有自己的this对象，
     * 而是继承父类的this对象，
     * 然后对其进行加工。
     * 如果不调用super方法，
     * 子类就得不到this对象。
     * @param props
     */
    constructor(props){//子类必须在constructor方法中调用super方法，否则新建实例时会报错
        super(props);//super关键字，父类的实例（父类的this对象）
        this.state = {
            list:[
                {
                    title:'吃饭',
                    checked:false
                },
                {
                    title:'睡觉',
                    checked:false
                },
                {
                    title:'打豆豆',
                    checked:false
                }
            ]
        };
    }
    //修改事项的状态
    checkBoxState=(key)=>{

        //alert("111");
        let tempList = this.state.list;
        //改变选中的状态
        tempList[key].checked = !tempList[key].checked;

        this.setState({
            list:tempList
        })

    }
    //删除
    removeDate=(key)=>{

        let tempList = this.state.list;
        //splice（key,1） 从key 开始 删除一个数据
        tempList.splice(key,1)

        this.setState({
            list:tempList
        })
    }



    addData= (e) =>{
        //Enter的 keyCode为13  这是键盘事件
        if(e.keyCode == 13){
            //获取输入框中的值
            let title = this.refs.title.value;
            //将数组赋值给一个零时的数组进行操作
            let tempList = this.state.list;

            //将输入框里的值放到数组中，默认为待办事件
            tempList.push({
                title:title,
                checked:false
            })

            //改变后的值赋值给原list
            this.setState({
                list:tempList
            })

            //添加后将输入框中的值清空
            this.refs.title.value = '';
        }
    }

    render(){

        return(
            <div className={"main"}>
                <div className={"add"}>

                    <header className="title">回车添加待办事项: 　<input ref="title" onKeyUp={this.addData} /> </header>
                </div>
                <div className={"no"}>
                    <h2>待办事项</h2>
                    <ul className="db">
                        {
                            this.state.list.map((value,key)=>{
                                if(!value.checked){
                                    return(
                                        <li>
                                            <input type="checkbox" checked={value.checked} onChange={this.checkBoxState.bind(this,key)}></input>
                                            {value.title}
                                             ------<button onClick={this.removeDate.bind(this,key)}>删除</button>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
                <div className={"yes"}>
                    <h2>已完成事项</h2>
                    <ul className="db2">
                        {
                            this.state.list.map((value,key)=>{
                                if(value.checked){
                                    return(
                                        <li>
                                            <input type="checkbox" checked={value.checked} onChange={this.checkBoxState.bind(this,key)}></input>
                                            {value.title}
                                            ------<button onClick={this.removeDate.bind(this,key)}>删除</button>
                                        </li>
                                    )
                                }
                            })
                        }

                    </ul>
                </div>
            </div>
        )
    }
}

export default Todo;