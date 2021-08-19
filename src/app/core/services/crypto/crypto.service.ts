import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
//import * as JsCrypto from "jscrypto/es6";

@Injectable({
  providedIn: "root",
})
export class CryptoService {
  constructor() {}

  setEncryptData(data){
    return ""//JsCrypto.AES.encrypt(JSON.stringify(data), environment.scrKy).toString();
  }

  setDecryptData(data){
    //var bytes  = JsCrypto.AES.decrypt(data, environment.scrKy);
    return "";//JSON.parse(bytes.toString(JsCrypto.Utf8));
  }
}