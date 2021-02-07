
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import moment from 'moment';
import { logStat } from 'src/app/modules/communications/fe-backend-db/membership/user.model';
import { Res } from 'src/app/modules/communications/fe-backend-db/res.model';
import { boardMenu, CommunityService } from 'src/app/modules/homes/body/community/community-services/community.service';
import { EPAuthService } from '../../../../communications/fe-backend-db/membership/auth.service';
import { PaginationModel } from '../../shared-services/pagination-service/pagination.model';
import { PaginationService } from '../../shared-services/pagination-service/pagination.service';
import { CommunityDocModel } from '../community.doc.model';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less']
})

export class FAQComponent implements OnInit {
  private docList: Array<CommunityDocModel>;
  private pageInfo: PaginationModel;
  private logStat: logStat;
  private pageSize = 10;
  private totalDocs: number;
  private startIndex: number = 0;
  private currentPage: number;
  private pages: number[];
  private totalPages: number;

  constructor(
    private router: Router,
    private cmService: CommunityService,
    private pgService: PaginationService,
    private authService: EPAuthService,

  ) { }

  ngOnInit() {
    this.authService.getLoginStatChange().subscribe(stat => {
      this.logStat = stat;
      console.log("comm compo stat : ", stat);
    });
    this.cmService.setBoardMenu(boardMenu.FAQ);
    this.loadPage(1);
  }

  async loadPage(currentPage: number) {
    this.docList = [];
    this.totalDocs = await this.cmService.getDocsNum();
    console.log(this.totalDocs);
    let pageInfo: PaginationModel = await this.pgService.paginate(currentPage, this.totalDocs, this.pageSize);
    this.setPageInfo(pageInfo);
    await this.loadDocs();
  }

  async loadDocs() {
    let generalDocs: Array<CommunityDocModel> = await this.cmService.getDocs(this.startIndex);
    if (generalDocs !== null)
      this.saveDocsInFormat(generalDocs);
  }

  setPageInfo(pageInfo: PaginationModel) {
    this.pages = pageInfo.pages;
    this.currentPage = pageInfo.currentPage;
    this.startIndex = pageInfo.startIndex;
    this.totalPages = pageInfo.totalPages;
  }

  saveDocsInFormat(list: {}[]): void {
    if (list == null) return;
    list.forEach((doc: CommunityDocModel) => {
      doc['regDate'] = moment(doc['regDate']).format('YY-MM-DD');
      this.docList.push(doc);
    });
  }

  navToReadThisDoc(i: number) {
    this.cmService.setSelectedDoc(this.docList[i]);
    this.router.navigateByUrl("community/readDoc");
  }

  updateSearchKey($event: { target: { value: any; }; }) {
    let keyword = $event.target.value;
  }

  navToWriteNewDoc() {
    this.router.navigateByUrl("community/newDoc");
  }

}
