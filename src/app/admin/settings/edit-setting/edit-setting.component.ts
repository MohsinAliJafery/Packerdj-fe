import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss']
})
export class EditSettingComponent implements OnInit {
  settingForm!: FormGroup;
  id: any | string;
  componentInView = new Subject();

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private setting_service: SettingService, private router: Router) { }

  ngOnInit(): void {

    this.settingForm = this.formBuilder.group({
      Bank_Name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Bank_Branch_Name: ['', [Validators.required]],
      Account_Number: ['', [Validators.required]],
      Bank_Account_Holder: ['', [Validators.required]],
      Swift_Code: ['', [Validators.required]],
      Career: ['', [Validators.required]],
      English: ['', [Validators.required]],
      Soft: ['', [Validators.required]],
      Technical: ['', [Validators.required]],
      _id: [''],
    });


    this.route.queryParams.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.getSettings();
      }
    });

  }

  getSettings(): void {
    this.setting_service.getSettings().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      if (response.result == 1) {
        this.settingForm.patchValue(response.settings);
      }
    }, error => {
      console.log(error);
    });
  }

  updateSetting(): void {
    if (this.settingForm.valid) {
      this.setting_service.updateSetting(this.settingForm.value).subscribe(
        (response: any) => {
          if (response.result == 1) {
            this.router.navigate(['/admin/dashboard/settings']);
          }
        },
      )

    } else {
      this.settingForm.markAllAsTouched();
    }
  }


}
