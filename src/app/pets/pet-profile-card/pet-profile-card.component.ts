import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-pet-profile-card',
  templateUrl: './pet-profile-card.component.html',
  styleUrls: ['./pet-profile-card.component.scss'],
})
export class PetProfileCardComponent implements OnInit, OnChanges {
  @Input() pet: any;
  public profileCard: any;
  public user$: any;

  constructor(
    private router: Router,
    public userAuth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.userAuth.user$
      .subscribe(user => {
        this.user$ = user;
      });
  }

  ngOnChanges(changes): void {
    console.log('this.pet', this.pet);
    this.createProfilecard(this.pet);
  }

  private createProfilecard(pet: any): void {
    this.profileCard = {
      button: pet.button,
      id: pet.id,
      title: pet.pet.name || '',
      image: pet.pet.image || '',
    };
  }

  public onClickButton(): void {
    if (this.profileCard.id === null) {
      this.router.navigateByUrl('/pets/pet-create');
    } else {
      this.router.navigateByUrl(`/pets/pet-care-card/${this.profileCard.id}`);
    }

  }

}
