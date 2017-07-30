import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import { DatabaseProvider } from "../../providers/database/database";
// import { ProfileProvider } from '../../providers/profile/profile';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',

})
export class UploadPage {
  profile: any;
  firstname: any;
  // public userProfile: firebase.database.Reference;
  // public currentUser:firebase.User;
  public displaySummary: any;
  captureDataUrl: string;
  public myPhoto: any;
  public myPhotosRef: any;
  public fdata: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private DB: DatabaseProvider
    // public profileProvider: ProfileProvider,
  ) {
    //    firebase.auth().onAuthStateChanged( user => {
    //   if (user){
    //     this.currentUser = user;
    //     this.userProfile = firebase.database().ref(`/userProfile/${user.uid}/profileData`);
    //   }
    // });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  takePicture() {

    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    });

  }

  loadProfile() {
    this.profile = this.DB.userProfile();
  }





  upload() {
    let storageRef = firebase.storage().ref();

    const filename = Math.floor(Date.now() / 1000);

    const imageRef = storageRef.child(`images/${filename}.jpg`);


    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((user) => {


      // firebase.database().ref('userProfile/')
      // .child(firebase.auth().currentUser.uid).child('userfeeds/')
      // .push({profile: user.downloadURL, userUid: firebase.auth().currentUser.uid})
      // .then((data)=>{


      //     let moderator:any = [];
      // firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/profileData/`)
      // .orderByKey().once('value', (items:any)=>{
      //   items.forEach(item => {
      //     moderator.push(item.val());
      //   });
      // })

      // this.profileProvider.getUserProfile().on('value' ,(data)=> {
      //   this.userProfile = data.val();
      //   let firstname = this.userProfile.orderByChild('firstname');
      // })

      let uid = firebase.auth().currentUser.uid;
      let userprofile: any;
      // let fdata = firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/`);
      let firstname = firebase.database().ref('userProfile/').orderByKey().once('child_added', (item: any) => {
        console.log(item.val());
        var data = item.val();
        data.feed = user.downloadURL;
        data.summary = this.displaySummary;
        data.uid = firebase.auth().currentUser.uid;
        firebase.database().ref('moderator/')
          .push(data)
      })
    })
    // });
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then((imageData) => {
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    });
  }

}
