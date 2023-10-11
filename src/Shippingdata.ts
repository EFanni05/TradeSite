export class Shipping{
    constructor(public name:string, public prio:number, public register:number){
        if(name.trim() == ""){
            throw new Error("ERROR: no country")
        }
        else if(prio < 0 && isNaN(prio)){
            throw new Error("ERROR: incorrect datat(prio)")
        }
        else if(register < 0 && isNaN(register)){
            throw new Error("ERROR: incorrect datat(register)")
        }
    }
}