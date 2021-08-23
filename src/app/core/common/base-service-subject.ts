import { BehaviorSubject } from "rxjs";

export class BaseServiceSubjectService {
    private static loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        true
    );
  
    static setSubject(subjectValue: boolean) {
        BaseServiceSubjectService.loadingSubject.next(subjectValue)
    }
  
    static getSubjectValue(): boolean {
      return BaseServiceSubjectService.loadingSubject.value;
    }
  }
