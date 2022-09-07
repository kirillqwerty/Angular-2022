import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { FormsModule } from "@angular/forms";
import { GameSettingsComponent } from "./game-settings/game-settings.component";
import { GamePageComponent } from "./game-page/game-page.component";
import { UserChoiceComponent } from "./user-choice/user-choice.component";
import { CommonModule } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { WinMessageComponent } from "./win-message/win-message.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CanActivateGameGuard } from "./can-activate-game.guard";

const appRoutes: Routes=[
    {path: "", component: AddUserComponent},
    {path: "choice", component: UserChoiceComponent},
    {path: "settings", component: GameSettingsComponent, canActivate: [CanActivateGameGuard]},
    {path: "game", component: GamePageComponent, canActivate: [CanActivateGameGuard]},
    {path: "**", component: AddUserComponent},
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
    NoopAnimationsModule,
    ReactiveFormsModule    
  ],
  bootstrap: [AppComponent],
  providers: [
    CanActivateGameGuard
  ]
})
export class AppModule { }
