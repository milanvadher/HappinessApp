import { Component } from '@angular/core';

import { FeedsPage } from "../feeds/feeds";
import { UploadPage } from "../upload/upload";
import { HappinessPage } from "../happiness/happiness";
import { ProfilePage } from "../profile/profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedsPage;
  tab2Root = UploadPage;
  tab3Root = HappinessPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
