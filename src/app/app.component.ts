import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServersService} from './servers.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  subscription: Subscription;
  appName = this.serversService.getApplicationName();

  constructor(private serversService: ServersService) {}

  ngOnInit(): void {
    this.appName = this.serversService.getApplicationName();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  onSave() {
    this.serversService.storeServers(this.servers).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  onGet() {
    // @ts-ignore
    this.subscription = this.serversService.getServers().subscribe(
      (servers: any[] ) => {
        this.servers = servers;
      },
      (error) => {
        console.log(error['message']);
      },
      () => {
        console.log('Completed');
      }
    );
  }
}
