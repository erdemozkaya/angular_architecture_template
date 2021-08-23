import { BehaviorSubject } from "rxjs";

export class BaseService2SubjectService {
    private static loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        true
    );
  
    static setSubject(subjectValue: boolean) {
        BaseService2SubjectService.loadingSubject.next(subjectValue)
    }
  
    static getSubjectValue(): boolean {
      return BaseService2SubjectService.loadingSubject.value;
    }
  }
