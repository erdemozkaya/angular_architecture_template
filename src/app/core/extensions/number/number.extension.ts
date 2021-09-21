declare global{
    interface Number{
        toNumber();
    }
}

Number.prototype.toNumber = function(){
    return Number(this)
}

export {}