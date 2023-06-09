import { Component, ElementRef,HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { REGEX_PATTERNS } from 'src/app/constants/constants';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  width = window.innerWidth;
  email = new FormControl(null, [
    Validators.required,
    Validators.pattern(REGEX_PATTERNS.email),
  ]);
  isFormSubmitted = false;
  isLoading = false;
  isWindowBelow550px: boolean = false;

  constructor(private sharedService: SharedService,private elementRef: ElementRef) {
    this.updateFormSubmittedStatus();
  }

  private updateFormSubmittedStatus(): void {
    this.isFormSubmitted = this.sharedService.isSubscribeFormSubmitted;
  }

  onSubscribe(): void {
    if(this.email.valid){
      this.isLoading = true;
      this.sharedService.subscribe(this.email.value).subscribe({
        next: () => {
          this.sharedService.isSubscribeFormSubmitted = true;
          this.isLoading = false;
          this.updateFormSubmittedStatus();
          this.email.reset();
          this.email.disable();
        },
        error: () => {
          this.sharedService.isSubscribeFormSubmitted = false;
          this.isLoading = false;
          this.updateFormSubmittedStatus();
        },
      });
    }
  }

  copper():void{
    window.open('https://hellocopper.ia', 'blank');
  }
  chiefNet():void{
    window.open('https://chiefnet.io', 'blank');
  }

  navigateToContactUs = ()=>{
    const contactSection = this.elementRef.nativeElement.querySelector('#contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }

 
   @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.isWindowBelow550px = window.innerWidth <= 550;
  }
  ngOnInit() {
    this.isWindowBelow550px = window.innerWidth <= 550;
  }

}
