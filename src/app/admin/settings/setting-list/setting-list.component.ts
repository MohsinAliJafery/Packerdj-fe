import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-setting-list',
  templateUrl: './setting-list.component.html',
  styleUrls: ['./setting-list.component.scss']
})
export class SettingListComponent implements OnInit {

  settingObj: any = []
  componentInView = new Subject();
  constructor(private setting_service: SettingService, private router: Router) { }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings(): void {
    this.setting_service.getSettings().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.settingObj = response.settings;
      }
    }, error => {
      console.log(error);
    });
  }

  editSetting(id: any) {
    const url = `/admin/dashboard/settings/edit?id=${id}`
    window.open(url, '_blank');
  }

}
