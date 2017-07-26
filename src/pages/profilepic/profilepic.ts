import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera , CameraOptions} from '@ionic-native/camera';
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {

   captureDataUrl: string;
  public myPhoto: any;
  public myPhotosRef: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilepicPage');
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

 upload() {
  let storageRef = firebase.storage().ref();

  const filename = Math.floor(Date.now() / 1000);

  const imageRef = storageRef.child(`images/${filename}.jpg`);

  
  imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((user) => {


    firebase.database().ref('userProfile/')
    .child(firebase.auth().currentUser.uid)
    .push({profilePic : user.downloadURL});

  });
 }

 selectPhoto() : void
 {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then((imageData) => {
    this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
  });
 }

 skip() {
   this.navCtrl.setRoot(TabsPage);
 }

}
