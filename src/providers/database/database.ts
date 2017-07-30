import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';

@Injectable()
export class DatabaseProvider {

  constructor(public http: Http) {
    console.log('Hello DatabaseProvider Provider');
  }

  renderFeeds(): Observable<any>{
    try {
      return new Observable(observer => {
        let feed: any = [];

        firebase.database().ref('publicFeeds/').orderByKey().once('value', (items:any) =>{
          observer.next(feed);
          observer.complete();

          items.forEach(item => {
            feed.push(item.val());
          });

           observer.next(feed.item);
          observer.complete();

         })
      })
    } catch (error) {
      
    }
  }

  renderStory(): Observable<any>{
    try {
      return new Observable(observer => {
        let story: any = [];

        firebase.database().ref('Moderator_Story/').orderByKey().once('value', (items:any) =>{
          observer.next(story);
          observer.complete();

          items.forEach(item =>{
            story.push(item.val());
          });

          observer.next(story.item);
          observer.complete();

        })
      })
    } catch (error) {
      
    }
  }

  userProfile(): Observable<any>{
    try {
      return new Observable(observer => {
        let userprofile: any = [];

        firebase.database().ref('userProfile/').orderByKey().once('value', (items:any) =>{
          observer.next(userprofile);
          observer.complete();

           items.forEach(item =>{
            userprofile.push(item.val());
          });

           observer.next(userprofile.item);
          observer.complete();

        })

      })
    } catch (error) {
      
    }
  }

}
