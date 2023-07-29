import { AfterViewInit, Component, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('sidebarAnimation', [
      state('hidden', style({
        width: '0',
        opacity: 0
      })),
      state('visible', style({
        width: '200px',
        opacity: 1
      })),
      transition('hidden => visible', animate('200ms ease-in')),
      transition('visible => hidden', animate('200ms ease-out'))
    ])
  ]
})
export class HeaderComponent implements AfterViewInit {
  public activeHeaderItem: string = 'home';
  public isSidebar: boolean = false;
  public innerWidth: number = 768;
  public sidebarOpenStatus: boolean = false;
  public headerTabs = [
    { title: 'Home', active: true, value: 'home', link: "/" },
    { title: 'About Us', active: true, value: 'about_us', link: "/about_us" },
    { title: 'Service', active: true, value: 'services', link: "/services" },
    { title: 'Our Teams', active: true, value: 'our_teams', link: "/our_teams" },
    { title: 'Contact Us', active: true, value: 'contact_us', link: "/contact_us" },
  ];

  constructor(private readonly _router: Router,) {}

  @HostListener('window:resize', [])
  private onResize() {
    this.detectScreenSize();
  }
  public ngAfterViewInit() {
    this.detectScreenSize();
  }

  public setActiveHeaderItem(headerItem: string, headerLink: string) {
    this.activeHeaderItem = headerItem;
    this._router.navigate([headerLink])
  }

  private detectScreenSize() {
    if (this.innerWidth >= window.innerWidth) {
      this.isSidebar = true;
    } else {
      this.isSidebar = false;
      this.sidebarOpenStatus = false
    }
  }

  public toggleSideBar() {
    this.sidebarOpenStatus = !this.sidebarOpenStatus;
  }
}
