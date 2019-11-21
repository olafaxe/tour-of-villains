import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VillainsComponent } from "./villains/villains.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { VillainDetailComponent } from "./villain-detail/villain-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "detail/:id", component: VillainDetailComponent },
  { path: "villains", component: VillainsComponent },
  { path: "dashboard", component: DashboardComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
