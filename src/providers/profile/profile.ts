import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class ProfileProvider {

  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;


  constructor(public http: Http) {

    firebase.auth().onAuthStateChanged( user => {
    if (user){
      this.currentUser = user;
      this.userProfile = firebase.database().ref(`/userProfile/${user.uid}/profileData`);
    }
  });

    console.log('Hello ProfileProvider Provider');
  }
  
  getUserProfile(): firebase.database.Reference {
  return this.userProfile;
}

updateName(firstname: string, lastname: string): firebase.Promise<void> {
  return this.userProfile.update({
    firstname: firstname,
    lastname: lastname,
  });
}

updateMobile( mobile:string ): firebase.Promise<void> {
  return this.userProfile.update({
    mobile: mobile
  });
}

updateEmail(newEmail: string, password: string): firebase.Promise<any> {
  const credential =  firebase.auth.EmailAuthProvider
    .credential(this.currentUser.email, password);

  return this.currentUser.reauthenticateWithCredential(credential)
  .then( user => {
    this.currentUser.updateEmail(newEmail).then( user => {
      this.userProfile.update({ email: newEmail });
    });
  });
}

updatePassword(newPassword: string, oldPassword: string):
firebase.Promise<any> {
  const credential =  firebase.auth.EmailAuthProvider
    .credential(this.currentUser.email, oldPassword);

  return this.currentUser.reauthenticateWithCredential(credential)
  .then( user => {
    this.currentUser.updatePassword(newPassword).then( user => {
      console.log("Password Changed");
    }, error => {
      console.log(error);
    });
  });
}


}
