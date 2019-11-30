import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FilterSettings } from "src/models/filters";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  panelOpenState = false;
  settings: FilterSettings;
  @Output() onSearch = new EventEmitter<FilterSettings>();
  constructor() {}

  ngOnInit() {
    this.settings = {};
  }

  clearAll() {
    this.settings.min = null;
    this.settings.max = null;
    this.settings.country = null;
    this.settings.name = null;
    this.search();
  }
  clearName() {
    this.settings.name = null;
  }
  clearCountry() {
    this.settings.country = null;
  }
  clearPrice() {
    this.settings.min = null;
    this.settings.max = null;
  }
  search() {
    this.onSearch.emit(this.settings);
    this.panelOpenState = !this.panelOpenState;
  }
}
