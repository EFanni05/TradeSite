export class Shipping{
    constructor(public name:string, public prio:number, public register:number, public prio500:number , public register500:number){
        if(name.trim() == ""){
            throw new Error("ERROR: no country")
        }
        else if(prio < 0 && isNaN(prio)){
            throw new Error("ERROR: incorrect datat(prio)")
        }
        else if(register < 0 && isNaN(register)){
            throw new Error("ERROR: incorrect datat(register)")
        }
        else if(prio500 < 0 && isNaN(prio500)){
            throw new Error("ERROR: incorrect datat(prio500)")
        }
        else if(register500 < 0 && isNaN(register500)){
            throw new Error("ERROR: incorrect datat(register500)")
        }
    }
}