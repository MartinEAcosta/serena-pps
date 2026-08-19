import { Component, EventEmitter, inject, input, Input, linkedSignal, Output, signal } from '@angular/core';
import { FilterOption } from '../../../utils/filters/filter.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LabelInfoComponent } from "../label-info/label-info.component";
import { LabelErrorComponent } from "../label-error/label-error.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-select-search',
  imports: [LabelInfoComponent, LabelErrorComponent, ReactiveFormsModule, NgClass],
  templateUrl: './select-search.component.html',
  styleUrl: './select-search.component.scss'
})
export class SelectSearchComponent {
  
  isOpen = signal<boolean>( false );

  @Input({ required : true }) labelText! : string;
  @Input({ required : true }) info! : string;
  @Input({ required : true }) options! : FilterOption[];
  @Input({ required : true }) prefix! : string;
  @Input({ required : true }) placeholder! : string;
  @Input({ required : true }) form! : FormGroup;
  
  searchText = signal<string>('');
  inputValue = linkedSignal<string>(() => this.searchText() ?? '');

  constructor() {}

  ngOnInit(): void {
  }

  get filteredOptions () : FilterOption[] {
    const query = this.searchText().trim().toLowerCase();
    if( !query ) return this.options;
    return this.options.filter( opt => opt.label.toLowerCase().includes(query) );
  }

  public toggle () : void {
    this.isOpen.set(!this.isOpen());
  }

  public close () : void {
    this.searchText.set('');
    this.isOpen.set(false);
  }

  public onKeyUp ( inputText : string ) : void {
    this.searchText.set( inputText );
    console.log(this.searchText())
  }

  get selectedOption(): FilterOption | null {
    const value = this.form.get(this.prefix)?.value;
    return this.options.find(o => o.value === value) ?? null;
  }

  public onSelectedChange ( option : FilterOption ) {
    this.form.get(this.prefix)?.setValue(option.value);
    this.close();
  }
 
}
