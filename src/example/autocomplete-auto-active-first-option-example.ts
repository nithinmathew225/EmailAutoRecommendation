import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HighlightSearchPipe } from './highlight.pipe';

// referenced from https://projects.verou.me/awesomplete/#email
const DOMAIN_LIST = [
  'aol.com',
  'att.net',
  'comcast.net',
  'facebook.com',
  'gmail.com',
  'gmx.com',
  'googlemail.com',
  'google.com',
  'hotmail.com',
  'hotmail.co.uk',
  'mac.com',
  'me.com',
  'mail.com',
  'msn.com',
  'live.com',
  'sbcglobal.net',
  'verizon.net',
  'yahoo.com',
  'yahoo.co.uk',
];

/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'autocomplete-auto-active-first-option-example',
  templateUrl: 'autocomplete-auto-active-first-option-example.html',
  styleUrl: 'autocomplete-auto-active-first-option-example.css',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    HighlightSearchPipe
  ],
})
export class AutocompleteAutoActiveFirstOptionExample implements OnInit {
  myControl = new FormControl('', { validators: [Validators.email] });
  options: string[] = DOMAIN_LIST;
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    if (value.includes('@')) {
      const filterValue = value.toLowerCase();

      return this.options
        .map((option) =>
          value.substring(0, value.indexOf('@') + 1).concat(option)
        )
        .filter((option) => option.toLowerCase().includes(filterValue));
    }
    return [];
  }
}
