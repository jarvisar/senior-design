import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';

@Component({
  selector: 'app-tri-state-checkbox',
  templateUrl: './tri-state-checkbox.component.html',
  styleUrls: ['./tri-state-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TriStateCheckboxComponent),
      multi: true,
    },
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions },
  ],
})
export class TriStateCheckboxComponent implements ControlValueAccessor {

  @Input() tape = [null, true, false];

  value: any;

  disabled: boolean;

  private onChange: (val: boolean | null) => void;
  private onTouched: () => void;

  writeValue(value: any) {
    this.value = value || this.tape[0];
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  next() {
    this.onChange(this.value = this.tape[(this.tape.indexOf(this.value) + 1) % this.tape.length]);
    this.onTouched();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}