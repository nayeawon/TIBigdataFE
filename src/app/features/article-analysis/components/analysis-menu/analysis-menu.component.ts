import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-analysis-menu",
  templateUrl: "./analysis-menu.component.html",
  styleUrls: ["./analysis-menu.component.css"],
})
export class AnalysisMenuComponent implements OnInit {
  private _title: string = "";
  private _currentMenu: string = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
    let url = this.router.url.split("/");
    this.currentMenu = url[url.length - 1];
    this.setTitle(this.currentMenu);
  }

  selectedStyleObject(flag: boolean): Object {
    if(matchMedia("(max-width: 425px)").matches) {
      if (flag) {
        return {
          color: "black",
          "font-weight": "bold",
          "border-bottom" : "0.2rem solid #0FBAFF",
        };
      } else {
        return {
          color: "#898C8D",
          "background-color": "white",
        };
      }
    }else{
      if (flag) {
        return {
          color: "#0FBAFF",
          "font-weight": "bold",
        };
      } else {
        return {
          color: "black",
          "background-color": "white",
        };
      }
    }
  }
  /**
   * @description Set title according to current address
   * @param currentAddress
   */
  setTitle(currentAddress: string) {
    if (currentAddress === "manual") this.title = "매뉴얼";
    if (currentAddress === "preprocessing") this.title = "전처리";
    if (currentAddress === "analysis") this.title = "분석";
  }

  toManual() {
    this.router.navigateByUrl("/analysis/manual");
    this.ngOnInit();
  }

  toPreprocessing() {
    this.router.navigateByUrl("/analysis/preprocessing");
    this.ngOnInit();
  }

  toAnalysis() {
    this.router.navigateByUrl("/analysis/analysis");
    this.ngOnInit();
  }

  public get currentMenu(): string {
    return this._currentMenu;
  }
  public set currentMenu(value: string) {
    this._currentMenu = value;
  }
  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }
}