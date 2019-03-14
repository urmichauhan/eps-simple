import { Component, OnInit } from "@angular/core";
import { shallowEqual } from "@angular/router/src/utils/collection";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public s = false;

  title = "eps";
  show() {
    this.s = true;
    console.log("show menu");
  }
}
