import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { AngularFireAuth } from 'angularfire2/auth';
import { Camera , CameraOptions} from '@ionic-native/camera';
// import { ImageProvider } from '../../providers/image/image';
import firebase from 'firebase';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  captureDataUrl: string;
  public myPhoto: any;
  public myPhotosRef: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    // private afAuth: AngularFireAuth, 
    private camera: Camera
    // private imageSrv: ImageProvider
  ) {
  }

  // cameraOptions: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // };

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

 upload() {
  let storageRef = firebase.storage().ref();

  const filename = Math.floor(Date.now() / 1000);

  const imageRef = storageRef.child(`images/${filename}.jpg`);

  
  imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((user) => {


    firebase.database().ref('userProfile/')
    .child(firebase.auth().currentUser.uid)
    .push({profile: user.downloadURL});

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
    // .then( imgData => {
    //   this.myPhoto = imgData;

    //   this.upload();
    // }, error =>{
    //   console.log.apply("Error ->" + JSON.stringify(error));
    // } )
 }

//  private uploadPhoto(): void {
//    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
//    .putString(this.myPhoto, 'base64', {contentType: 'image/png'})
//    .then((savedPic) => {
//      this.captureDataUrl = savedPic.captureDataUrl;
//    })
//  }

  // private generateUUID(): any {
  //   var d = new Date().getTime();
  //   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
  //     var r = (d + Math.random() * 16) % 16 | 0;
  //     d = Math.floor(d / 16);
  //     return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  //   return uuid;
  // }
    
}
