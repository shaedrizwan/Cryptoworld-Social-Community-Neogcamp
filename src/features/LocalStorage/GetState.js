export function GetState(){
    try{
        const serializedState = localStorage.getItem('login')
        if(serializedState === null){
            return {login: false,token:null,user:{}}
        }else{
            return JSON.parse(serializedState)
        }
    }catch(err){
        return {login: false,token:null,user:{}}
    }
}