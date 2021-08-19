import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CryptoService } from "../crypto/crypto.service";
declare var $: any;

@Injectable({
  providedIn: "root",
})
export class GlobalFunctionsService {

  constructor(
    private cryptoService:CryptoService
  ) {}

  getAPIUrl(): string {
    return environment.baseUrl;
  }

  arrayIcindekiNesneyiGuncelleme(
    _arr: Array<any>,
    newObj: any,
    updatedIndex: number
  ) {
    //const updatedIndex = _arr.findIndex(obj => obj.value === 'aa');

    return [
      ..._arr.slice(0, updatedIndex),
      newObj,
      ..._arr.slice(updatedIndex + 1),
    ];
  }

  /**
   * @param T `group by yapilacak nesnenin tipi verilmeli
   * 
   * orn; fatura satir vergi nesnesini taxCode a gore gruplamak icin :
   * this.globalSettingsService.groupBy<IInvoiceLineTax>(x=>[x.taxTax.taxCode],this.invoiceLineTax);
  */
  groupBy<T>(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ) {
    var helper = {};
    var result = [].concat.apply([], thisArg).reduce(function (r, o) {
      var key = predicate.apply(this, [o]);
      //var pre = predicate.toString().split('=>')[1].split(',').join('-').replace(/x./gim,'o.').replace('[','').replace(']','').replace(/ /g,'');

      if (!helper[key]) {
        helper[key] = Object.assign({}, o);
        helper[key].list = [];
        helper[key].list.push(Object.assign({}, o));
        r.push(helper[key]);
      } else {
        helper[key].list.push(Object.assign({}, o));
      }

      return r;
    }, []);

    return result;
  }

  isEmpty(obj) {
    if (obj == null) return true;

    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    if (typeof obj !== "object") return true;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  }

  isEmptyField(field: string) {
    return field == undefined ? true : field.trim().length === 0 ? true : false;
  }

  isEmptyNumber(field: number) {
    return field === undefined || field === null;
  }

  getBoolean(value) {
    switch (value) {
      case true:
      case "true":
      case 1:
      case "1":
      case "on":
      case "yes":
        return true;
      default:
        return false;
    }
  }

  createGuidId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  isNumber(str) {
    var parsed = parseFloat(str);
    var casted = +str;
    return parsed === casted && !isNaN(parsed) && !isNaN(casted);
  }

  /**
   * @param selector `.element` olarak verilmeli
   */
  gotoElementScroll(selector: string) {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(selector).offset().top,
      },
      300
    );
  }

  //EXP: StokCari -> Stok Cari
  convertCamelCaseToSpace(input) {
    return input
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  turkishtoEnglish(input: string) {
    return input
      .replace(/Ğ/gim, "g")
      .replace(/Ü/gim, "u")
      .replace(/Ş/gim, "s")
      .replace(/I/gim, "i")
      .replace(/İ/gim, "i")
      .replace(/Ö/gim, "o")
      .replace(/Ç/gim, "c")
      .replace(/ğ/gim, "g")
      .replace(/ü/gim, "u")
      .replace(/ş/gim, "s")
      .replace(/ı/gim, "i")
      .replace(/ö/gim, "o")
      .replace(/ç/gim, "c");
  }

  emptyToSymbol(val, arg?: any) {
    switch (typeof val) {
      case "string":
        return this.isEmptyField(val) ? (arg ? arg : "-") : val;

      case "object":
      case "boolean":
        return this.isEmpty(val) ? (arg ? arg : "-") : val;

      case "number":
        return this.isEmptyNumber(val) ? (arg ? arg : "0") : val;

      default:
        return this.isEmpty(val) ? (arg ? arg : "-") : val;
    }
  }

  cloneWithoutReference(T: any) {
    return JSON.parse(JSON.stringify(T));
  }

  spaceRemoveAll(val: string) {
    return val.replace(/ /gim, "");
  }

  enumConvertList(Tenum: any) {
    let arr = [];
    for (let item in Tenum) {
      if (isNaN(Number(item))) {
        let obj = {
          id: Tenum[item],
          value: item,
        };
        arr.push(obj);
      }
    }

    return arr;
  }

  /**
   * @param str eger mime type html ise kullanilmali
   */
  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }
}
