import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessor),
  multi: true
};


@Directive({
  selector: '[useValueAsDate]',
  providers: [DATE_VALUE_ACCESSOR]
})
export class DateValueAccessor implements ControlValueAccessor {
  private value: Date = new Date();
  @HostListener('input', ['$event']) onChange = (_: any) => { };
  @HostListener('blur', []) onTouched = () => { };

  private valueType: 'value' | 'valueAsDate' = 'value';

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) { }

  writeValue(date: Date | string): void {
    //this.valueType = typeof value === 'string' ? 'value' : 'valueAsDate';
    const utcDate: Date = date ?
      new Date(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate()+1) :
      null;
    this._renderer.setProperty(this._elementRef.nativeElement, "valueAsDate", utcDate);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = (event: any) => fn(event.target[this.valueType]) }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

}
