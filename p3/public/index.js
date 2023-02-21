


let login_form = document.querySelector('.login_form')
let logout_form = document.querySelector('.logout_form')
let memo_form = document.querySelector('.memo_form')
let test_form = document.querySelector('.test_form')
let add_memo_file_btn = document.querySelector('#file_button_add')

test_form.addEventListener('submit',async e=>{
    e.preventDefault()
    let formData = new FormData(test_form)
    let res = await fetch('test_form',{
        method:"POST",
        body:formData
    })
    
    let res_json = await res.json()
    
    if(!res_json.isErr){
        console.log(res_json)
        
    }else{
        alert(res_json.errMess)
    }
})

window.addEventListener('DOMContentLoaded', (event) => {
    main()
    
});




let memos = []
let user
async function main(){
    await getCurrentUser()
    
    
    reg_login_click_event()
    reg_logout_click_event()
    reg_add_memo_form_event()

    await getAllMemo()
    
}


async function getAllMemo(){
    let res = await fetch('memo/getMemo')
    let res_json = await res.json()
    if(!res_json.isErr){
        memos = res_json.data
        render_memos()
    }else{
        alert(res_json.errMess)
    }
    
    
    
    
}
{/* <div class="like_counter">${obj.like_count}</div> */}
{/*  */}

async function render_memos(){
    let memo_div = document.querySelector('.memos_row')
    
    memo_div.innerHTML = memos.map(obj=>`
    <div class="memo">
        <div class="like_counter">${obj.like_count}</div>
        <button data-id="${obj.id}" class="edit btn${user.userId !== obj.users_id ? ' isHide' : ''}"><i data-id="${obj.id}" class="fa-solid fa-pen-to-square"></i></button>
        <button data-id="${obj.id}" class="trash btn${user.userId !== obj.users_id ? ' isHide' : ''}"><i data-id="${obj.id}" class="fa-solid fa-trash"></i></button>
        <button data-id="${obj.id}" class="like btn${user.userId !== obj.users_id && user.isLogin === true ? '' : ' isHide'}"><i data-id="${obj.id}" class="fa-solid fa-thumbs-up"></i></button>    
        <div class="content memo_content_${obj.id}" contenteditable="${user.userId === obj.users_id ? true : false}">${obj.content}</div>        
        <img class="memo_img" src="${obj.image}" alt="" />

    </div>
`).join('')

    reg_edit_memo_btn()
    reg_like_memo_btn()
    reg_del_memo_btn()
}

async function reg_del_memo_btn(){
    let del_btn_s = document.querySelectorAll('.trash.btn')
    for(let btn of del_btn_s){
        btn.addEventListener('click',async e=>{
            e.preventDefault()
            let id = e.target.dataset.id
            let res = await fetch(`memo/delMemo/${id}`,{
                headers:{
                    "Content-Type":"Application/json"
                },
                method:"DELETE",
                body:''
            })
    
            let res_json = await res.json()
            


            if(!res_json.isErr){
                memos = memos.filter(obj=>obj.id != id)
           
                render_memos()
            }else{
                alert(res_json.errMess)
            }
        })    

        

    }
}

async function reg_like_memo_btn(){
    let like_btn_s = document.querySelectorAll('.like.btn')
    for(let btn of like_btn_s){
        btn.addEventListener('click',async e=>{
            e.preventDefault()
            let id = e.target.dataset.id
            let res = await fetch(`memo/likeMemo/${id}`,{
                headers:{
                    "Content-Type":"Application/json"
                },
                method:"POST",
                body:''
            })
    
            let res_json = await res.json()
            
            if(!res_json.isErr){
                memos = memos.map(obj=>obj.id == id ? Object.assign(obj,{like_count:obj.like_count+1}):obj)
            
                render_memos()
            }else{
                alert(res_json.errMess)
            }
        })    
    }
}
async function reg_edit_memo_btn(){
    let edit_btn_s = document.querySelectorAll('.edit.btn')
    for(let btn of edit_btn_s){
        btn.addEventListener('click',async e=>{
            e.preventDefault()
            let formData = new FormData()
            let id = e.target.dataset.id
            let content = document.querySelector(`.memo_content_${id}`).innerText
            
            formData.append('content',content)
            
            
            let res = await fetch(`memo/editMemo/${id}`,{
                method:"PUT",
                body:formData
            })
    
            let res_json = await res.json()
            

            if(!res_json.isErr){
                
            }else{
                alert(res_json.errMess)
            }

        })
    }
}

async function render_all_form(){
    if(user.isLogin){
        login_form.classList.add('isHide')
        logout_form.classList.remove('isHide')
        memo_form.classList.remove('isHide')
        
    }else{
        login_form.classList.remove('isHide')
        logout_form.classList.add('isHide')
        memo_form.classList.add('isHide')
    }
}

async function getCurrentUser(){
    let res = await fetch('user/getCurrentUser')
    let res_json = await res.json()
    
    
    if(res_json.isErr){
        console.log(res_json.errMess)
        user = {isLogin:false}
    }else{
        user = res_json.data
    }
    render_all_form()

}
async function reg_login_click_event(){

    login_form.addEventListener('submit', async e=>{
        
        e.preventDefault()
        let formData = new FormData(login_form)
        let res = await fetch('user/login',{
            method:"POST",
            body:formData
        })

        let res_json = await res.json()
        
        

        if(!res_json.isErr){
            // let res = await fetch('register2fs')
    
            // let res_json = await res.json()
            // console.log(res_json)
            
            // document.querySelector('.opt').classList.remove('isHide')
            // let qrCode_img = document.querySelector('#google_mfa_qrCode')
            // qrCode_img.src = res_json.data.qr
            // localStorage.setItem('secret', res_json.data.secret);
            
            // document.querySelector('#otp_btn').addEventListener('click',async e=>{
            //     let obj = {
            //         secret:localStorage.getItem('secret'),
            //         token:document.querySelector('.otp_input').value
            //     }
            //     console.log(obj)
            //     let res = await fetch('verify2fs',{
            //         headers:{
            //             "Content-type":"Application/json"
            //         },
            //         method:"POST",
            //         body:JSON.stringify(obj)
            //     })
            //     let res_json = await res.json()
            //     if(!res_json.verified){
                    user = res_json.data
                    render_all_form()
                    render_memos()
                    socket.emit('login',{})
                    
                // }else{
                //     alert('fail to verified')
                //     // do something
                // }
            // })
            
            

        }else{
            alert(res_json.errMess)
            user = {isLogin:false}
        }
    })
}
function reg_logout_click_event(){
    logout_form.addEventListener('submit', async e=>{
        
        e.preventDefault()
        
        let res = await fetch('user/logout',{
            headers:{
                "Content-type":"Application/json"
            },
            method:"POST",
            body:''
        })

        let res_json = await res.json()
        
        user = res_json.data
        
        if(!res_json.isErr){
            socket.emit('logout',{})        
            
            render_all_form()
            render_memos()
            
        }else{
            alert(res_json.errMess)
        }
    })
}

async function reg_add_memo_form_event(){
    let file_add_input = document.querySelector('#file_add')
    add_memo_file_btn.addEventListener('click',e=>{
        e.preventDefault()
        file_add_input.click()


    })
    file_add_input.addEventListener('change',e=>{
        if(e.target.files){
            document.querySelector('#img_add').src = URL.createObjectURL(e.target.files[0])
            
        }
    })


    memo_form.addEventListener('submit',async e=>{
        e.preventDefault()
        let content = document.querySelector('.add_memo_form_content')
        
        let formData = new FormData(memo_form)
        formData.append('content',content.innerText)
        let res = await fetch('memo/addMemo',{
            method:"POST",
            body:formData
        })
        
        let res_json = await res.json()
        
        if(!res_json.isErr){
            memos = res_json.data
            render_memos()
            socket.emit("add-memo", { memo: res_json.data[res_json.data.length - 1] });  
        }else{
            alert(res_json.errMess)
        }
        
        
    })
}



