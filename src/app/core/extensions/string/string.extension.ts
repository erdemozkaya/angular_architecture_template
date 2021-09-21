declare global{
    interface String{
        turkishToLower();
        toNumber();
        toBoolean();
    }
}

String.prototype.turkishToLower = function() {
    var string = this;
    var letters = { "İ": "i", "I": "i", "ı": "i", "Ş": "s", "ş": "s", "Ğ": "g", "ğ": "g", "Ü": "u", "ü": "u", "Ö": "o", "ö": "o", "Ç": "c", "ç": "c" };
    string = string.replace(/(([İIŞĞÜÇÖışğüçö]))+/g, function(letter){ return letters[letter]; })
    return string.toLowerCase();
}

String.prototype.toNumber = function(){
    return Number(this)
}

String.prototype.toBoolean = function(){
    return Boolean(this)
}

export {}