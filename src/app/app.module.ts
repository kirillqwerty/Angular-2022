import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { GamePageComponent } from './game-page/game-page.component';
import { UserChoiceComponent } from './user-choice/user-choice.component';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WinMessageComponent } from './win-message/win-message.component';

const appRoutes: Routes=[
  {path:'', component: AddUserComponent},
  {path:'choice', component: UserChoiceComponent},
  {path:'settings', component: GameSettingsComponent},
  {path:'game', component: GamePageComponent},
  {path:'**', component: AddUserComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    GameSettingsComponent,
    GamePageComponent,
    UserChoiceComponent,
    WinMessageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NoopAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
