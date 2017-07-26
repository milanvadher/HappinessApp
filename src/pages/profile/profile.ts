import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { ProfileProvider } from '../../providers/profile/profile';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

   public userProfile: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public profileProvider: ProfileProvider,
    private afAuth: AngularFireAuth
  ) {
    
  }

  ionViewDidEnter() {
  this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
    this.userProfile = userProfileSnapshot.val();
  });
}

 logOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  updateName(){
  let alert = this.alertCtrl.create({
    message: "Your first name & last name",
    inputs: [
      {
        name: 'firstname',
        placeholder: 'Your first name',
        value: this.userProfile.firstname
      },
      {
        name: 'lastname',
        placeholder: 'Your last name',
        value: this.userProfile.lastname
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileProvider.updateName(data.firstname, data.lastname);
        }
      }
    ]
  });
  alert.present();
}

updateMobile () {
  let alert = this.alertCtrl.create({
    message: "Your Mobile no.",
    inputs: [
      {
        name: 'mobile',
        placeholder: 'Your new Mobile no',
        value: this.userProfile.mobile
      }
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileProvider.updateMobile(data.mobile);
        }
      }
    ]
  });
  alert.present();
}

updateEmail(){
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newEmail',
        placeholder: 'Your new email',
      },
      {
        name: 'password',
        placeholder: 'Your password',
        type: 'password'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileProvider.updateEmail(data.newEmail, data.password);
        }
      }
    ]
  });
  alert.present();
}

updatePassword(){
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newPassword',
        placeholder: 'Your new password',
        type: 'password'
      },
      {
        name: 'oldPassword',
        placeholder: 'Your old password',
        type: 'password'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
        }
      }
    ]
  });
  alert.present();
}
  

}
