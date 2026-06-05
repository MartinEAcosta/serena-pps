import { Component, Input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { DropdownList } from '@models/resources/resources.model';

@Component({
  selector: 'app-section-dropdown',
  templateUrl: './section-dropdown.component.html',
  styleUrl: './section-dropdown.component.scss',
  imports: [NgClass]
})
export class SectionDropdownComponent {

  @Input() titleHeader : string = '';
  @Input() dropdownItems : DropdownList[] = [];

  isOpenMap = signal<Map<string,boolean>>(this.initializeMap());

  initializeMap() : Map<string,boolean> {
    const openMap = new Map<string,boolean>();
    for( const item of this.dropdownItems ){
      openMap.set(item.title , false);
    }
    return openMap;
  }

  toggleDropdown( title : string ) : void {
    const newMap = this.isOpenMap().set(
      title,
      !this.isOpenMap().get(title)
    );
    this.isOpenMap.set( newMap );
  }


}
