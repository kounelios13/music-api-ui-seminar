import { Component, OnInit } from '@angular/core';
import { GroupService } from './services/group.service';
import { Group } from './models/group';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
interface NavLinkItem {
  label: string;
  link: string;
  index: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'musicUI';
  groups: Group[] = [];
  columns = ['id', 'groupName', 'description', 'groupGenreID'];
  dataSource: MatTableDataSource<Group> = new MatTableDataSource<Group>([]);

  activeLinkIndex = -1;
  activeLink = ''
  navLinks: NavLinkItem[] = [{ label: 'Groups', index: 0, link: '' }, { label: 'Genres', link: './genres', index: 1 }, { label: 'Songs', link: './songs', index: 2 }];
  constructor(private groupService: GroupService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.groups = await this.groupService.getGroups();
    this.dataSource = new MatTableDataSource<Group>(this.groups);
    this.router.events.subscribe((res) => {
      // @ts-ignore
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
      if (this.activeLinkIndex < 0) {
        this.activeLinkIndex = 0;
      }
    });
  }
}
